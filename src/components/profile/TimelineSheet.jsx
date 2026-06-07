import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../../lib/supabase'
import useLikes from '../../hooks/useLikes'

const TYPE_LABELS = {
  foto: '📸',
  pegada: '🦶',
  atropelamento: '🚗',
  comunicacao: '📞',
}

export default function TimelineSheet({ onClose, onViewProfile, userId }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const { likesData, loadLikes, toggleLike } = useLikes(userId)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('sightings')
      .select('*, animals(name, emoji, tier, pts), profiles(name, username, avatar_emoji, avatar_url), has_photo')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50)
    if (data) setEntries(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const entryIds = useMemo(() => entries.map(e => e.id), [entries])

  useEffect(() => {
    if (entryIds.length) loadLikes(entryIds)
  }, [entryIds, loadLikes])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 15000,
      background: 'rgba(0,0,0,.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn .2s ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-ultra)',
        WebkitBackdropFilter: 'var(--glass-blur-ultra)',
        borderRadius: 'var(--r-2xl)', width: '100%', maxWidth: 420, maxHeight: '85%',
        overflowY: 'auto', padding: 28,
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)' }}>
            🌍 Timeline
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={(e) => { e.stopPropagation(); fetch() }}
              style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer', transition: 'all .2s' }}
              title="Atualizar"
            >🔄</button>
            <button onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
            >✕</button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 64, borderRadius: 'var(--r-md)' }} />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-3)', fontSize: 14 }}>
            Nenhum registro público ainda
          </div>
        ) : (
          <div style={{ position: 'relative', paddingLeft: 20 }}>
            <div style={{
              position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
              background: 'var(--glass-border)',
            }} />
            {entries.map(s => {
              const p = s.profiles
              return (
                <div key={s.id} style={{
                  position: 'relative', paddingBottom: 16,
                }}>
                  <div style={{
                    position: 'absolute', left: -16, top: 8,
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '2px solid var(--bg-deep)',
                  }} />
                  <div style={{
                    display: 'flex', gap: 10,
                    padding: '10px 12px', borderRadius: 'var(--r-md)',
                    background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                  }}>
                    {s.video_url ? (
                      <div style={{
                        width: 44, height: 44, borderRadius: 'var(--r-sm)',
                        background: 'var(--glass-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, flexShrink: 0,
                      }}>
                        🎥
                      </div>
                    ) : s.photo_url ? (
                      <img src={s.photo_url} alt=""
                        style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0 }}
                      />
                    ) : (
                      <div style={{
                        width: 44, height: 44, borderRadius: 'var(--r-sm)',
                        background: 'var(--glass-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22, flexShrink: 0,
                      }}>
                        {s.animals?.emoji || '🐾'}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)' }}>
                          {s.animals?.emoji} {s.animals?.name}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                          {TYPE_LABELS[s.sighting_type] || ''}
                        </span>
                      </div>
                      {p && (
                        <button onClick={(e) => { e.stopPropagation(); onClose(); onViewProfile?.(p.id) }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                            marginTop: 2,
                          }}
                        >
                          {p.avatar_url ? (
                            <img src={p.avatar_url} alt="" style={{ width: 14, height: 14, borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: 12 }}>{p.avatar_emoji || '🧭'}</span>
                          )}
                          <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
                            {p.name || p.username}
                          </span>
                        </button>
                      )}
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {new Date(s.observed_at || s.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {s.lat && s.lng && ` · ${s.lat.toFixed(4)}, ${s.lng.toFixed(4)}`}
                      </div>
                      {s.description && (
                        <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2, fontStyle: 'italic' }}>
                          “{s.description}”
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, alignSelf: 'center' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)', whiteSpace: 'nowrap' }}>
                        +{s.pts_earned}
                      </div>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          const res = await toggleLike(s.id)
                          if (res?.error) return
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 2,
                          background: 'none', border: 'none',
                          color: likesData[s.id]?.liked ? '#e74c3c' : 'var(--text-3)',
                          fontSize: 11, fontWeight: 600, cursor: 'pointer',
                          padding: '2px 6px', borderRadius: 999,
                          transition: 'all .2s',
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{likesData[s.id]?.liked ? '❤️' : '🤍'}</span>
                        {likesData[s.id]?.count || 0}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {entries.length > 0 && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--glass)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
              Últimos {entries.length} registros da comunidade
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
