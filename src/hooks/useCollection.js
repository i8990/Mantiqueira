import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export default function useCollection(userId) {
  const [seenIds, setSeenIds] = useState(new Set())
  const [seenCount, setSeenCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data } = await supabase
      .from('sightings')
      .select('animal_id')
      .eq('user_id', userId)
    if (data) {
      const ids = new Set(data.map(s => s.animal_id))
      setSeenIds(ids)
      setSeenCount(ids.size)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { seenIds, seenCount, loading, refresh }
}
