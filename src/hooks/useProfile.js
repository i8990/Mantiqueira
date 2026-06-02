import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

function uuidv4() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) | (c === 'x' ? 0 : 8)
    return r.toString(16)
  })
}

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
      .maybeSingle()
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

  const updateUsername = async (username) => {
    if (!username || username.length < 3) return { error: 'Mínimo 3 caracteres' }

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .neq('id', userId)
      .maybeSingle()

    if (existing) return { error: 'Este nome de usuário já está em uso' }

    const { error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', userId)

    if (!error) {
      setProfile(prev => prev ? { ...prev, username } : prev)
    }
    return { error: error?.message || null }
  }

  const updateAvatar = async (file) => {
    if (!file) return { error: 'Nenhum arquivo selecionado' }

    const ext = file.name.split('.').pop()
    const filePath = `${userId}/${uuidv4()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) return { error: uploadError.message }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)

    if (!updateError) {
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : prev)
    }

    return { error: updateError?.message || null }
  }

  const updateName = async (name) => {
    if (!name || name.length < 3) return { error: 'Mínimo 3 caracteres' }
    const { error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('id', userId)
    if (!error) {
      setProfile(prev => prev ? { ...prev, name } : prev)
    }
    return { error: error?.message || null }
  }

  return { profile, loading, error, refresh, updateUsername, updateName, updateAvatar }
}
