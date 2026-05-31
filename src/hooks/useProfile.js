import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) {
      setError(error.message)
    } else {
      setProfile(data)
      setError(null)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const updateAvatar = async (emoji) => {
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_emoji: emoji })
      .eq('id', userId)
    if (!error) {
      setProfile(prev => prev ? { ...prev, avatar_emoji: emoji } : prev)
    }
    return { error }
  }

  return { profile, loading, error, refresh, updateAvatar }
}
