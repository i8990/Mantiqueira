import { useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function useLikes(userId) {
  const [likesData, setLikesData] = useState({})
  const loadedRef = useRef(new Set())

  const loadLikes = useCallback(async (sightingIds) => {
    if (!sightingIds?.length || !userId) return
    const uncached = sightingIds.filter(id => !loadedRef.current.has(id))
    if (!uncached.length) return

    const { data } = await supabase
      .rpc('get_likes_info', { p_sighting_ids: uncached, p_user_id: userId })

    if (data) {
      setLikesData(prev => {
        const next = { ...prev }
        for (const row of data) {
          next[row.sighting_id] = { count: Number(row.count), liked: row.user_liked }
          loadedRef.current.add(row.sighting_id)
        }
        return next
      })
    }
  }, [userId])

  const toggleLike = useCallback(async (sightingId) => {
    const { data, error } = await supabase.rpc('toggle_like', { p_sighting_id: sightingId })
    if (error) return { error }

    setLikesData(prev => ({
      ...prev,
      [sightingId]: { count: data.count, liked: data.liked },
    }))
    return data
  }, [])

  const loadLikers = useCallback(async (sightingId) => {
    const { data } = await supabase.rpc('get_likers', { p_sighting_id: sightingId })
    return data || []
  }, [])

  return { likesData, loadLikes, toggleLike, loadLikers }
}
