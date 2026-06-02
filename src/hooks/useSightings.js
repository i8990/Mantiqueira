import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { ANIMALS, SIGHTING_TYPE_MULTIPLIERS } from '../lib/constants'

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

    const multiplier = SIGHTING_TYPE_MULTIPLIERS[sightingType] || 1
    const ptsEarned = Math.round(animal.pts * multiplier)

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
      })
      .select()
      .single()

    return { data, error: error?.message }
  }

  return { sightings, loading, error, refresh, createSighting }
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
        .select('*, animals(name, emoji, tier, pts), profiles(username, avatar_emoji), has_photo')
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
