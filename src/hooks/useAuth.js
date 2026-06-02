import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function useAuth() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === 'SIGNED_IN' && session?.user?.app_metadata?.provider === 'google') {
        const u = session.user
        const name = u.user_metadata?.full_name || u.user_metadata?.name || null
        const avatarUrl = u.user_metadata?.avatar_url || u.user_metadata?.picture || null
        if (name) {
          const { data: existing } = await supabase
            .from('profiles')
            .select('id, username, name')
            .eq('id', u.id)
            .maybeSingle()

          if (!existing || (existing.username && existing.username.startsWith('matago_'))) {
            let username = generateUsername(name)
            const { data: taken } = await supabase
              .from('profiles')
              .select('id')
              .eq('username', username)
              .neq('id', u.id)
              .maybeSingle()
            if (taken) username += Math.floor(Math.random() * 9000 + 1000)

            await supabase.from('profiles').upsert({
              id: u.id,
              name,
              username: existing?.username || username,
              avatar_url: avatarUrl,
              avatar_emoji: '🧭',
              total_pts: 0,
            }).maybeSingle()
          } else if (!existing?.name) {
            await supabase.from('profiles').update({ name, avatar_url: avatarUrl }).eq('id', u.id).maybeSingle()
          }
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const generateUsername = (name) => {
    const base = name
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 20)
    if (!base) return 'explorador' + Math.floor(Math.random() * 10000)
    return base
  }

  const signUp = async (email, password, name) => {
    let username = generateUsername(name)

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle()

    if (existing) {
      username += Math.floor(Math.random() * 9000 + 1000)
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, name } },
    })
    if (!error && data?.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        name,
        username,
        avatar_emoji: '🧭',
        total_pts: 0,
      }).maybeSingle()
    }
    return { data, error, autoUsername: username }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { session, user, loading, signUp, signIn, signInWithGoogle, signOut }
}
