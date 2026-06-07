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

  const VIDEO_EXTS = ['mp4', 'webm', 'mov', 'avi', 'mkv', '3gp']

  function isVideoFile(file) {
    const ext = file?.name?.split('.').pop()?.toLowerCase()
    return file?.type?.startsWith('video/') || VIDEO_EXTS.includes(ext)
  }

  const createSighting = async ({ animalId, sightingType, photoFile, videoFile, description, lat, lng, observedAt }) => {
    if (!animalId) return { error: 'Nenhum animal selecionado' }
    if (!sightingType) return { error: 'Tipo de avistamento não selecionado' }

    const animal = ANIMALS.find(a => a.id === animalId)
    if (!animal) return { error: 'Animal não encontrado na base local' }

    try {
      let photoUrl = null

      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const filePath = `${userId}/${uuidv4()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('sightings-photos')
          .upload(filePath, photoFile)
        if (uploadError) {
          return { error: `Erro ao enviar foto: ${uploadError.message}` }
        }
        const { data: { publicUrl } } = supabase.storage
          .from('sightings-photos')
          .getPublicUrl(filePath)
        photoUrl = publicUrl
      }

      let videoUrl = null
      if (videoFile) {
        const ext = videoFile.name.split('.').pop()
        const filePath = `${userId}/${uuidv4()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('sightings-videos')
          .upload(filePath, videoFile)
        if (uploadError) {
          return { error: `Erro ao enviar vídeo: ${uploadError.message}` }
        }
        const { data: { publicUrl } } = supabase.storage
          .from('sightings-videos')
          .getPublicUrl(filePath)
        videoUrl = publicUrl
      }

      const typeMult = SIGHTING_TYPE_MULTIPLIERS[sightingType] || 1

      let qualityBonus = 0
      if (description && description.length > 10) qualityBonus += QLTY_BONUS_DESC
      if (lat && lng) qualityBonus += QLTY_BONUS_GPS
      if (observedAt) qualityBonus += QLTY_BONUS_DATE

      let isRepeat = false
      try {
        const { count, error: countError } = await supabase
          .from('sightings')
          .select('*', { count: 'exact', head: true })
          .eq('animal_id', animalId)
          .eq('user_id', userId)
        if (!countError) {
          isRepeat = (count || 0) > 0
        }
      } catch (_) {
        // se a consulta falhar, assume primeiro registro (bônus cheio)
      }

      const sightingFactor = isRepeat ? REPEAT_SIGHTING_MULTIPLIER : FIRST_SIGHTING_MULTIPLIER
      const ptsEarned = Math.round(animal.pts * typeMult * (1 + qualityBonus) * sightingFactor)

      const { data, error } = await supabase
        .from('sightings')
        .insert({
          user_id: userId,
          animal_id: animalId,
          photo_url: photoUrl,
          video_url: videoUrl,
          description: description || null,
          lat: lat || null,
          lng: lng || null,
          sighting_type: sightingType,
          pts_earned: ptsEarned,
          observed_at: observedAt || null,
          is_public: true,
        })
        .select()
        .single()

      if (error) {
        let msg = error.message
        if (msg?.includes('schema cache') || msg?.includes('does not exist') || msg?.includes('relation')) {
          msg = 'Erro de configuração do banco de dados. Execute as migrations pendentes no Supabase Dashboard.'
        } else if (msg?.includes('violates row-level security') || msg?.includes('permission denied') || msg?.includes('JWT')) {
          msg = 'Erro de autenticação. Faça login novamente.'
        } else if (msg?.includes('violates not-null') || msg?.includes('null value')) {
          msg = 'Campos obrigatórios não preenchidos. Preencha todos os campos e tente novamente.'
        } else if (msg?.includes('duplicate key') || msg?.includes('already exists')) {
          msg = 'Este registro já existe.'
        }
        return { data, error: msg }
      }

      return { data, error: null }

    } catch (err) {
      return { error: err?.message || 'Erro inesperado ao salvar o avistamento. Tente novamente.' }
    }
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

    if (sighting.video_url) {
      try {
        const url = new URL(sighting.video_url)
        const pathParts = url.pathname.split('/')
        const bucketIndex = pathParts.indexOf('sightings-videos')
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/')
          await supabase.storage.from('sightings-videos').remove([filePath])
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

  const updateSighting = async (sightingId, { photoFile, videoFile, description, lat, lng, observedAt, sightingType, keepExistingPhoto, keepExistingVideo }) => {
    try {
      const { data: existing, error: fetchError } = await supabase
        .from('sightings')
        .select('*')
        .eq('id', sightingId)
        .single()

      if (fetchError) return { error: fetchError.message }
      if (!existing) return { error: 'Registro não encontrado' }

      const animal = ANIMALS.find(a => a.id === existing.animal_id)
      if (!animal) return { error: 'Animal não encontrado na base local' }

      let photoUrl = existing.photo_url
      let videoUrl = existing.video_url

      if (keepExistingPhoto) {
        // keep the existing photo
      } else if (photoFile) {
        if (existing.photo_url) {
          try {
            const url = new URL(existing.photo_url)
            const pathParts = url.pathname.split('/')
            const bucketIndex = pathParts.indexOf('sightings-photos')
            if (bucketIndex !== -1) {
              const filePath = pathParts.slice(bucketIndex + 1).join('/')
              await supabase.storage.from('sightings-photos').remove([filePath])
            }
          } catch (_) {}
        }

        const ext = photoFile.name.split('.').pop()
        const filePath = `${existing.user_id}/${uuidv4()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('sightings-photos')
          .upload(filePath, photoFile)
        if (uploadError) return { error: `Erro ao enviar foto: ${uploadError.message}` }

        const { data: { publicUrl } } = supabase.storage
          .from('sightings-photos')
          .getPublicUrl(filePath)
        photoUrl = publicUrl
      } else if (photoFile === null) {
        if (existing.photo_url) {
          try {
            const url = new URL(existing.photo_url)
            const pathParts = url.pathname.split('/')
            const bucketIndex = pathParts.indexOf('sightings-photos')
            if (bucketIndex !== -1) {
              const filePath = pathParts.slice(bucketIndex + 1).join('/')
              await supabase.storage.from('sightings-photos').remove([filePath])
            }
          } catch (_) {}
        }
        photoUrl = null
      }

      if (keepExistingVideo) {
        // keep the existing video
      } else if (videoFile) {
        if (existing.video_url) {
          try {
            const url = new URL(existing.video_url)
            const pathParts = url.pathname.split('/')
            const bucketIndex = pathParts.indexOf('sightings-videos')
            if (bucketIndex !== -1) {
              const filePath = pathParts.slice(bucketIndex + 1).join('/')
              await supabase.storage.from('sightings-videos').remove([filePath])
            }
          } catch (_) {}
        }

        const ext = videoFile.name.split('.').pop()
        const filePath = `${existing.user_id}/${uuidv4()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('sightings-videos')
          .upload(filePath, videoFile)
        if (uploadError) return { error: `Erro ao enviar vídeo: ${uploadError.message}` }

        const { data: { publicUrl } } = supabase.storage
          .from('sightings-videos')
          .getPublicUrl(filePath)
        videoUrl = publicUrl
      } else if (videoFile === null) {
        if (existing.video_url) {
          try {
            const url = new URL(existing.video_url)
            const pathParts = url.pathname.split('/')
            const bucketIndex = pathParts.indexOf('sightings-videos')
            if (bucketIndex !== -1) {
              const filePath = pathParts.slice(bucketIndex + 1).join('/')
              await supabase.storage.from('sightings-videos').remove([filePath])
            }
          } catch (_) {}
        }
        videoUrl = null
      }

      const finalType = sightingType || existing.sighting_type
      const finalDesc = description !== undefined ? description : existing.description
      const finalLat = lat !== undefined ? lat : existing.lat
      const finalLng = lng !== undefined ? lng : existing.lng
      const finalObservedAt = observedAt !== undefined ? observedAt : existing.observed_at

      const typeMult = SIGHTING_TYPE_MULTIPLIERS[finalType] || 1

      let qualityBonus = 0
      if (finalDesc && finalDesc.length > 10) qualityBonus += QLTY_BONUS_DESC
      if (finalLat && finalLng) qualityBonus += QLTY_BONUS_GPS
      if (finalObservedAt) qualityBonus += QLTY_BONUS_DATE

      let isRepeat = false
      try {
        const { count, error: countError } = await supabase
          .from('sightings')
          .select('*', { count: 'exact', head: true })
          .eq('animal_id', existing.animal_id)
          .eq('user_id', existing.user_id)
          .neq('id', sightingId)
        if (!countError) {
          isRepeat = (count || 0) > 0
        }
      } catch (_) {}

      const sightingFactor = isRepeat ? REPEAT_SIGHTING_MULTIPLIER : FIRST_SIGHTING_MULTIPLIER
      const ptsEarned = Math.round(animal.pts * typeMult * (1 + qualityBonus) * sightingFactor)

      const updateData = {}
      if (photoUrl !== existing.photo_url) updateData.photo_url = photoUrl
      if (videoUrl !== existing.video_url) updateData.video_url = videoUrl
      if (finalDesc !== existing.description) updateData.description = finalDesc
      if (finalLat !== existing.lat) updateData.lat = finalLat
      if (finalLng !== existing.lng) updateData.lng = finalLng
      if (finalObservedAt !== existing.observed_at) updateData.observed_at = finalObservedAt
      if (finalType !== existing.sighting_type) updateData.sighting_type = finalType
      updateData.pts_earned = ptsEarned

      if (Object.keys(updateData).length === 0) return { error: null, data: existing }

      const { data, error } = await supabase
        .from('sightings')
        .update(updateData)
        .eq('id', sightingId)
        .select()
        .single()

      if (error) return { error: error.message }

      await refresh()
      return { data, error: null }
    } catch (err) {
      return { error: err?.message || 'Erro inesperado ao atualizar o avistamento' }
    }
  }

  return { sightings, loading, error, refresh, createSighting, deleteSighting, updateSighting }
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
      .or('photo_url.is.not,null,video_url.is.not,null')

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
