import { useState, useEffect } from 'react'
import { ANIMALS, calcLevel, TIER_LABELS, LEVELS } from '../../lib/constants'
import { supabase } from '../../lib/supabase'
import BadgeGrid from '../profile/BadgeGrid'
import RankCard from '../profile/RankCard'
import AnimalCard from '../collection/AnimalCard'
import AnimalDetailSheet from '../collection/AnimalDetailSheet'
import ProgressBar from '../ui/ProgressBar'
import RarityChip from '../ui/RarityChip'
import Card from '../ui/Card'
import Button from '../ui/Button'
import useAuth from '../../hooks/useAuth'

const RARITY_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...Object.entries(TIER_LABELS).map(([key, label]) => ({ key, label })),
]

export default function ProfileScreen({ profile, sightings, seenIds }) {
  const { signOut, user } = useAuth()
  const levelData = calcLevel(profile?.total_pts || 0)
  const [rarityFilter, setRarityFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [rankData, setRankData] = useState([])
  const [showRanking, setShowRanking] = useState(false)
  const [rankingLoading, setRankingLoading] = useState(false)

  const fetchLeaderboard = async () => {
    setRankingLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_emoji, total_pts')
      .order('total_pts', { ascending: false })
    if (data) setRankData(data)
    setRankingLoading(false)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const userRank = rankData.findIndex(r => r.id === profile?.id) + 1
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : null

  const filtered = rarityFilter === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.tier === rarityFilter)

  const stats = [
    { icon: '📍', label: 'Registros', value: sightings?.length || 0 },
    { icon: '🦎', label: 'Espécies', value: seenIds?.size || 0 },
    { icon: '🔥', label: 'Streak', value: `${profile?.streak_days || 0}d` },
    { icon: '🏆', label: 'Ranking', value: userRank ? `#${userRank}` : '-' },
  ]

  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '32px 16px 24px',
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-ultra)',
        WebkitBackdropFilter: 'var(--glass-blur-ultra)',
        borderRadius: 'var(--r-2xl)',
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeUp .4s var(--ease-spring)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--glass)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          border: '0.5px solid var(--glass-border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          boxShadow: 'var(--shadow-md)',
        }}>
          {profile?.avatar_emoji || '🧭'}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 24,
          color: 'var(--text-1)',
          letterSpacing: '-0.02em',
        }}>
          @{profile?.username || 'matago'}
        </h2>
        {memberSince && (
          <span style={{
            fontSize: 11,
            color: 'var(--text-3)',
            marginTop: -8,
          }}>
            Membro desde {memberSince}
          </span>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <span style={{
            padding: '4px 14px',
            borderRadius: 999,
            background: 'var(--amber-dim)',
            color: 'var(--amber)',
            fontSize: 12,
            fontWeight: 600,
            border: '0.5px solid rgba(245,167,51,0.2)',
          }}>
            Nível {levelData.level}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {levelData.name}
          </span>
        </div>
      </div>

      <div style={{ animation: 'fadeUp .45s var(--ease-spring)' }}>
        <BadgeGrid seenIds={seenIds} profile={profile} sightings={sightings} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        animation: 'fadeUp .5s var(--ease-spring)',
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            padding: '12px 6px',
            background: 'var(--glass)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderRadius: 'var(--r-lg)',
            textAlign: 'center',
            border: '0.5px solid var(--glass-border)',
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--text-1)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 500, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ animation: 'fadeUp .55s var(--ease-spring)' }}>
        <RankCard totalPts={profile?.total_pts || 0} rankData={rankData} userId={profile?.id} />
      </div>

      <div style={{ animation: 'fadeUp .6s var(--ease-spring)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>
            Coleção
          </h3>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
            {seenIds.size}/{ANIMALS.length}
          </span>
        </div>

        <Card variant="glass" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>
              {levelData.name}
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--amber)',
              background: 'var(--amber-dim)',
              padding: '2px 8px',
              borderRadius: 999,
            }}>
              Nível {levelData.level}
            </span>
          </div>
          <ProgressBar current={levelData.current} max={levelData.next} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: 'var(--text-3)',
            marginTop: 4,
          }}>
            <span>{levelData.current} pts</span>
            <span>{levelData.next} pts</span>
          </div>
        </Card>

        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 10,
          scrollbarWidth: 'none',
        }}>
          {RARITY_FILTERS.map(f => (
            <RarityChip
              key={f.key}
              label={f.label}
              filter={f.key}
              active={rarityFilter === f.key}
              onClick={() => setRarityFilter(f.key)}
            />
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          paddingBottom: 20,
        }}>
          {filtered.map((animal, index) => (
            <div key={animal.id} style={{ animation: `fadeUp .3s var(--ease-spring)`, animationDelay: `${index * 0.03}s` }}>
              <AnimalCard
                animal={animal}
                isSeen={seenIds.has(animal.id)}
                onClick={() => setSelectedId(animal.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 12,
        paddingBottom: 20,
      }}>
        <Button variant="glass" leftIcon="🏆" onClick={() => setShowRanking(true)}>
          Ranking
        </Button>
        <Button variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </div>

      {showRanking && (
        <div onClick={() => setShowRanking(false)} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(0,0,0,.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          animation: 'fadeIn .2s ease-out',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--glass-strong)',
            backdropFilter: 'var(--glass-blur-ultra)',
            WebkitBackdropFilter: 'var(--glass-blur-ultra)',
            borderRadius: 'var(--r-2xl)',
            maxHeight: '85%',
            width: '100%',
            maxWidth: 400,
            overflowY: 'auto',
            padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)',
            animation: 'scaleIn .35s var(--ease-spring)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-d)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--text-1)',
              }}>
                🏆 Ranking
              </h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); fetchLeaderboard() }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--glass)',
                    border: '0.5px solid var(--glass-border)',
                    color: 'var(--text-3)',
                    fontSize: 16,
                    cursor: 'pointer',
                    transition: 'all .2s',
                  }}
                  title="Atualizar"
                >
                  🔄
                </button>
                <button onClick={() => setShowRanking(false)} style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--glass)',
                  border: '0.5px solid var(--glass-border)',
                  color: 'var(--text-3)',
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}>
                  ✕
                </button>
              </div>
            </div>

            {rankingLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 48, borderRadius: 'var(--r-sm)' }} />
                ))}
              </div>
            ) : rankData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-3)' }}>
                Nenhum jogador cadastrado ainda
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {rankData.map((p, i) => {
                  const isMe = p.id === profile?.id
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`
                  return (
                    <div key={p.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 'var(--r-md)',
                      background: isMe ? 'var(--accent-dim)' : 'var(--glass)',
                      border: isMe ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
                      transition: 'all .2s',
                    }}>
                      <span style={{
                        width: 28,
                        fontSize: 13,
                        fontWeight: 700,
                        color: i < 3 ? undefined : 'var(--text-3)',
                        textAlign: 'center',
                        flexShrink: 0,
                      }}>
                        {medal}
                      </span>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{p.avatar_emoji || '🧭'}</span>
                      <span style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: isMe ? 700 : 500,
                        color: isMe ? 'var(--accent)' : 'var(--text-1)',
                      }}>
                        @{p.username}
                        {isMe && <span style={{ fontSize: 11, color: 'var(--accent)', marginLeft: 6 }}>(você)</span>}
                      </span>
                      <span style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: 'var(--amber)',
                      }}>
                        {p.total_pts} pts
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              background: 'var(--glass)',
              borderRadius: 'var(--r-md)',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Total de {rankData.length} {rankData.length === 1 ? 'guardião' : 'guardiões'} na Mantiqueira
              </span>
            </div>
          </div>
        </div>
      )}

      {selectedId && (
        <AnimalDetailSheet
          animalId={selectedId}
          isSeen={seenIds.has(selectedId)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
