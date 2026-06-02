import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import {
  ANIMALS, SIGHTING_TYPE_MULTIPLIERS,
  QLTY_BONUS_DESC, QLTY_BONUS_GPS, QLTY_BONUS_DATE,
  FIRST_SIGHTING_MULTIPLIER, REPEAT_SIGHTING_MULTIPLIER,
} from '../lib/constants'

function uuidv4() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) | (c === 'x' ? 0 : 8)
    return r.toString(16)
  })
}

export default function useSightings(userId) {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('sightings')
        .select('*, animals(name, emoji, tier, pts), has_photo')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
      } else {
        setSightings(data || [])
        setError(null)
      }
    } catch (err) {
      setError(err?.message || 'Erro ao carregar avistamentos')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const createSighting = async ({ animalId, sightingType, photoFile, description, lat, lng, observedAt }) => {
    const animal = ANIMALS.find(a => a.id === animalId)
    if (!animal) return { error: 'Animal não encontrado' }

    let photoUrl = null

    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const filePath = `${userId}/${uuidv4()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('sightings-photos')
        .upload(filePath, photoFile)
      if (uploadError) return { error: uploadError.message }
      const { data: { publicUrl } } = supabase.storage
        .from('sightings-photos')
        .getPublicUrl(filePath)
      photoUrl = publicUrl
    }

    const typeMult = SIGHTING_TYPE_MULTIPLIERS[sightingType] || 1

    let qualityBonus = 0
    if (description && description.length > 10) qualityBonus += QLTY_BONUS_DESC
    if (lat && lng) qualityBonus += QLTY_BONUS_GPS
    if (observedAt) qualityBonus += QLTY_BONUS_DATE

    const { count } = await supabase
      .from('sightings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('animal_id', animalId)

    const isRepeat = (count || 0) > 0
    const sightingFactor = isRepeat ? REPEAT_SIGHTING_MULTIPLIER : FIRST_SIGHTING_MULTIPLIER

    const ptsEarned = Math.round(animal.pts * typeMult * (1 + qualityBonus) * sightingFactor)

    const { data, error } = await supabase
      .from('sightings')
      .insert({
        user_id: userId,
        animal_id: animalId,
        photo_url: photoUrl,
        description: description || null,
        lat: lat || null,
        lng: lng || null,
        sighting_type: sightingType || 'foto',
        pts_earned: ptsEarned,
        observed_at: observedAt || null,
        is_public: true,
      })
      .select()
      .single()

    if (error) {
      let msg = error.message
      if (msg?.includes('schema cache') || msg?.includes('does not exist')) {
        msg = 'Erro de configuração do banco de dados. Execute as migrations pendentes no Supabase Dashboard.'
      }
      return { data, error: msg }
    }

    return { data, error: null }
  }

  const deleteSighting = async (sightingId) => {
    const { data: sighting, error: fetchError } = await supabase
      .from('sightings')
      .select('*')
      .eq('id', sightingId)
      .single()

    if (fetchError) return { error: fetchError.message }
    if (!sighting) return { error: 'Registro não encontrado' }

    if (sighting.photo_url) {
      try {
        const url = new URL(sighting.photo_url)
        const pathParts = url.pathname.split('/')
        const bucketIndex = pathParts.indexOf('sightings-photos')
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/')
          await supabase.storage.from('sightings-photos').remove([filePath])
        }
      } catch (e) {
        // silently ignore storage delete errors
      }
    }

    const { error: deleteError } = await supabase
      .from('sightings')
      .delete()
      .eq('id', sightingId)

    if (deleteError) return { error: deleteError.message }

    await refresh()
    return { error: null }
  }

  return { sightings, loading, error, refresh, createSighting, deleteSighting }
}

export function usePublicPhotos(userId) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('sightings')
      .select('*, animals(name, emoji), profiles!inner(name, username, avatar_emoji)')
      .eq('is_public', true)
      .not('photo_url', 'is', null)

    if (userId) query = query.eq('user_id', userId)

    const { data } = await query.order('created_at', { ascending: false })
    setPhotos(data || [])
    setLoading(false)
  }, [userId])

  useEffect(() => { refresh() }, [refresh])

  return { photos, loading, refresh }
}

export function useAllSightings() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('sightings')
        .select('*, animals(name, emoji, tier, pts), profiles(name, username, avatar_emoji), has_photo')
        .not('lat', 'is', null)
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
      } else {
        setSightings(data || [])
        setError(null)
      }
    } catch (err) {
      setError(err?.message || 'Erro ao carregar avistamentos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { sightings, loading, error, refresh }
}
