import { useState, useEffect, useRef } from 'react'
import { ANIMALS, TIER_LABELS, BADGE_REWARDS, STREAK_REWARDS, LEVEL_REWARD_PTS } from '../../lib/constants'
import { supabase } from '../../lib/supabase'
import useAppStore from '../../stores/useAppStore'
import useAuth from '../../hooks/useAuth'
import useProfile from '../../hooks/useProfile'
import useGamification from '../../hooks/useGamification'
import BadgeGrid from '../profile/BadgeGrid'
import ProfileHeader from '../profile/ProfileHeader'
import MySightingsSheet from '../profile/MySightingsSheet'
import TimelineSheet from '../profile/TimelineSheet'
import MonthlyMissions from '../profile/MonthlyMissions'
import AnimalCard from '../collection/AnimalCard'
import AnimalDetailSheet from '../collection/AnimalDetailSheet'
import RarityChip from '../ui/RarityChip'
import Button from '../ui/Button'

const RARITY_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...Object.entries(TIER_LABELS).map(([key, label]) => ({ key, label })),
]

export default function ProfileScreen({ profile, sightings, seenIds = new Set(), deleteSighting }) {
  const { signOut, user } = useAuth()
  const myProfile = useProfile(user?.id)
  const theme = useAppStore(s => s.theme)
  const setTheme = useAppStore(s => s.setTheme)

  const [rarityFilter, setRarityFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [rankData, setRankData] = useState([])
  const [showRanking, setShowRanking] = useState(false)
  const [showMySightings, setShowMySightings] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [rankingLoading, setRankingLoading] = useState(false)

  const gamification = useGamification({
    profile,
    sightings: sightings || [],
    seenIds,
    userId: user?.id,
  })

  const [viewProfileId, setViewProfileId] = useState(null)
  const [pubProfile, setPubProfile] = useState(null)
  const [pubPhotos, setPubPhotos] = useState([])
  const [pubLoading, setPubLoading] = useState(false)
  const [expandedPhoto, setExpandedPhoto] = useState(null)

  const [showSettings, setShowSettings] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')
  const fileInputRef = useRef(null)

  const fetchLeaderboard = async () => {
    setRankingLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('id, name, username, avatar_emoji, avatar_url, total_pts')
      .order('total_pts', { ascending: false })
    if (data) setRankData(data)
    setRankingLoading(false)
  }

  useEffect(() => { fetchLeaderboard() }, [])

  useEffect(() => {
    if (!viewProfileId) { setPubProfile(null); setPubPhotos([]); return }
    setPubLoading(true)
    Promise.all([
      supabase.from('profiles').select('*').eq('id', viewProfileId).single(),
      supabase
        .from('sightings')
        .select('*, animals(name, emoji)')
        .eq('user_id', viewProfileId)
        .not('photo_url', 'is', null)
        .order('created_at', { ascending: false }),
    ]).then(([profRes, photosRes]) => {
      if (profRes.data) setPubProfile(profRes.data)
      if (photosRes.data) setPubPhotos(photosRes.data)
      setPubLoading(false)
    })
  }, [viewProfileId])

  useEffect(() => {
    if (showEditProfile && profile) {
      setEditName(profile.name || '')
      setEditUsername(profile.username || '')
      setUsernameAvailable(null)
      setProfileMsg('')
    }
  }, [showEditProfile, profile])

  const userRank = rankData.findIndex(r => r.id === (viewProfileId || profile?.id)) + 1
  const showProfile = viewProfileId ? pubProfile : profile

  const showPhotos = viewProfileId
    ? pubPhotos
    : (sightings || []).filter(s => s.photo_url)

  const seenAnimals = ANIMALS.filter(a => seenIds.has(a.id))
  const filteredSeen = rarityFilter === 'all'
    ? seenAnimals
    : seenAnimals.filter(a => a.tier === rarityFilter)

  const stats = viewProfileId
    ? [
        { icon: '📍', label: 'Registros', value: pubPhotos.length || '-' },
        { icon: '🏆', label: 'Ranking', value: userRank ? `#${userRank}` : '-' },
        { icon: '🔥', label: 'Streak', value: `${showProfile?.streak_days || 0}d` },
        { icon: '⭐', label: 'Pontos', value: showProfile?.total_pts || 0 },
      ]
    : [
        { icon: '📍', label: 'Registros', value: sightings?.length || 0 },
        { icon: '🦎', label: 'Espécies', value: seenIds?.size || 0 },
        { icon: '🔥', label: 'Streak', value: `${profile?.streak_days || 0}d` },
        { icon: '⭐', label: 'Pontos', value: profile?.total_pts || 0 },
      ]

  const checkUsername = async (val) => {
    if (!val || val.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', val)
      .neq('id', user?.id)
      .maybeSingle()
    setUsernameAvailable(!data)
    setCheckingUsername(false)
  }

  const handleEditUsername = (val) => {
    setEditUsername(val)
    setProfileMsg('')
    if (val === profile?.username) { setUsernameAvailable(null); return }
    const timer = setTimeout(() => checkUsername(val), 400)
    return () => clearTimeout(timer)
  }

  const handleSaveProfile = async () => {
    if (!editName || editName.length < 3) {
      setProfileMsg('Mínimo 3 caracteres')
      return
    }
    setSavingProfile(true)
    setProfileMsg('')

    let err
    if (editName !== profile?.name) {
      const { error } = await myProfile.updateName(editName)
      if (error) err = error
    }
    if (!err && editUsername !== profile?.username) {
      const { error } = await myProfile.updateUsername(editUsername)
      if (error) err = error
    }

    if (err) {
      setProfileMsg(err)
    } else {
      setProfileMsg('✅ Salvo!')
      setTimeout(() => { setShowEditProfile(false); setShowSettings(false) }, 800)
    }
    setSavingProfile(false)
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSavingProfile(true)
    const { error } = await myProfile.updateAvatar(file)
    if (error) setProfileMsg(error)
    else setProfileMsg('✅ Foto atualizada!')
    setSavingProfile(false)
  }

  const themeT = theme === 'light'

  return (
    <div style={{
      padding: '20px 16px 120px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {viewProfileId && (
        <button
          onClick={() => setViewProfileId(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0',
            background: 'none', border: 'none', color: 'var(--accent)',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start',
          }}
        >
          ← Voltar ao meu perfil
        </button>
      )}

      {pubLoading && viewProfileId ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>Carregando...</div>
      ) : (
        <>
          <ProfileHeader
            profile={showProfile}
            rankData={rankData}
            onOpenRanking={() => setShowRanking(true)}
          />

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
            animation: 'fadeUp .5s var(--ease-spring)',
          }}>
            {stats.map(s => (
              <div key={s.label} style={{
                padding: '12px 6px', background: 'var(--glass)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                borderRadius: 'var(--r-lg)', textAlign: 'center',
                border: '0.5px solid var(--glass-border)',
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 500, marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Level-up Reward */}
          {!viewProfileId && gamification.canLevelUp && (
            <div style={{
              animation: 'fadeUp .45s var(--ease-spring)',
              padding: '14px 16px',
              background: 'var(--coral-dim)',
              borderRadius: 'var(--r-lg)',
              border: '0.5px solid var(--coral)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>⬆️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--coral)' }}>
                  Subiu para {gamification.levelData.name}!
                </div>
                <div style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 500 }}>
                  {gamification.pendingLevelClaims} níveis · +{gamification.pendingLevelClaims * LEVEL_REWARD_PTS} pts disponíveis
                </div>
              </div>
              <button
                onClick={async () => {
                  await gamification.claimLevelReward()
                  window.location.reload()
                }}
                style={{
                  padding: '8px 18px', borderRadius: 999,
                  background: 'var(--coral)', color: '#fff',
                  border: 'none', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', flexShrink: 0,
                }}
              >
                REIVINDICAR
              </button>
            </div>
          )}

          {/* Streak Rewards */}
          {!viewProfileId && gamification.availableStreakRewards.length > 0 && (
            <div style={{ animation: 'fadeUp .45s var(--ease-spring)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>
                🔥 Recompensas de Sequência
              </h3>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 2 }}>
                {gamification.streakDay} dias seguidos
              </div>
              {gamification.availableStreakRewards.map(sr => (
                <div key={sr.days} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 'var(--r-md)',
                  background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                }}>
                  <span style={{ fontSize: 20 }}>{sr.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>
                    {sr.label}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)', marginRight: 8 }}>
                    +{sr.pts} pts
                  </span>
                    <button
                      onClick={async () => {
                        await gamification.claimStreakReward(sr.days, sr.pts)
                        window.location.reload()
                      }}
                      style={{
                      padding: '6px 14px', borderRadius: 999,
                      background: 'var(--accent)', color: '#060D07',
                      border: 'none', fontSize: 11, fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    REIVINDICAR
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Monthly Missions */}
          {!viewProfileId && gamification.monthMissionsStatus?.length > 0 && (
            <MonthlyMissions
              missions={gamification.monthMissionsStatus}
              onClaim={gamification.claimMonthlyMission}
            />
          )}

          {/* Research Mastery */}
          {!viewProfileId && seenIds.size > 0 && (
            <div style={{ animation: 'fadeUp .45s var(--ease-spring)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)', marginBottom: 10 }}>
                🔬 Pesquisa por Espécie
              </h3>
              <div style={{
                display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4,
                scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
              }}>
                {Array.from(seenIds).slice(0, 12).map(aid => {
                  const a = ANIMALS.find(x => x.id === aid)
                  if (!a) return null
                  const totalSightingsOfSpecies = (sightings || []).filter(s => s.animal_id === aid).length
                  const pct = Math.min(100, totalSightingsOfSpecies * 25)
                  return (
                    <div key={aid} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: '10px 8px', borderRadius: 'var(--r-lg)',
                      background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                      minWidth: 72, flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 22 }}>{a.emoji}</span>
                      <span style={{ fontSize: 8, color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.1 }}>
                        {a.name.split(' ')[0]}
                      </span>
                      <div style={{
                        width: '100%', height: 3,
                        background: 'var(--glass-border)',
                        borderRadius: 2, overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${pct}%`, height: '100%',
                          background: 'var(--accent)',
                          borderRadius: 2,
                          transition: 'width .4s var(--ease-spring)',
                        }} />
                      </div>
                      <span style={{ fontSize: 7, color: 'var(--text-3)' }}>{Math.round(pct)}%</span>
                    </div>
                  )
                })}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6, textAlign: 'center' }}>
                Registre cada espécie várias vezes para completar a pesquisa
              </div>
            </div>
          )}

          {!viewProfileId && (
            <div style={{ animation: 'fadeUp .45s var(--ease-spring)' }}>
              <BadgeGrid
                seenIds={seenIds}
                profile={profile}
                sightings={sightings}
                claimedBadges={profile?.claimed_badges || []}
                badgeRewards={BADGE_REWARDS}
                onClaimBadge={gamification.claimBadgeReward}
              />
            </div>
          )}

          {showPhotos.length > 0 && (
            <div style={{ animation: 'fadeUp .55s var(--ease-spring)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)', marginBottom: 10 }}>
                📸 {viewProfileId ? 'Fotos' : 'Minhas fotos'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {showPhotos.slice(0, 9).map(s => (
                  <div key={s.id} onClick={() => setExpandedPhoto(s)}
                    style={{
                      aspectRatio: '1', overflow: 'hidden', cursor: 'pointer',
                      background: 'var(--glass)', position: 'relative',
                    }}
                  >
                    <img src={s.photo_url} alt={s.animals?.name || 'Foto'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {showPhotos.length > 9 && (
                <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>
                  +{showPhotos.length - 9} fotos
                </div>
              )}
            </div>
          )}

          {!viewProfileId && seenAnimals.length > 0 && (
            <div style={{ animation: 'fadeUp .65s var(--ease-spring)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>Coleção</h3>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{seenIds.size}/{ANIMALS.length}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 10, scrollbarWidth: 'none' }}>
                {RARITY_FILTERS.map(f => (
                  <RarityChip key={f.key} label={f.label} filter={f.key} active={rarityFilter === f.key} onClick={() => setRarityFilter(f.key)} />
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, paddingBottom: 20 }}>
                {filteredSeen.map((animal, index) => (
                  <div key={animal.id} style={{ animation: `fadeUp .3s var(--ease-spring)`, animationDelay: `${index * 0.03}s` }}>
                    <AnimalCard animal={animal} isSeen={true} onClick={() => setSelectedId(animal.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 20 }}>
            <Button variant="glass" leftIcon="📋" onClick={() => setShowMySightings(true)} fullWidth>
              Meus Registros
            </Button>
            <Button variant="glass" leftIcon="🌍" onClick={() => setShowTimeline(true)} fullWidth>
              Timeline
            </Button>
            <Button variant="glass" leftIcon="🏆" onClick={() => setShowRanking(true)} fullWidth>
              Ranking
            </Button>
            <Button variant="glass" leftIcon="⚙️" onClick={() => setShowSettings(true)} fullWidth>
              Config
            </Button>
            {!viewProfileId && (
              <Button variant="ghost" onClick={signOut} fullWidth>
                Sair
              </Button>
            )}
          </div>
        </>
      )}

      {/* Ranking Modal */}
      {showRanking && (
        <div onClick={() => setShowRanking(false)} style={{
          position: 'fixed', inset: 0, zIndex: 10000,
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
            borderRadius: 'var(--r-2xl)', maxHeight: '85%', width: '100%', maxWidth: 400,
            overflowY: 'auto', padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)' }}>🏆 Ranking</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={(e) => { e.stopPropagation(); fetchLeaderboard() }}
                  style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer', transition: 'all .2s' }}
                  title="Atualizar"
                >🔄</button>
                <button onClick={() => setShowRanking(false)}
                  style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer', transition: 'all .2s' }}
                >✕</button>
              </div>
            </div>
            {rankingLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 48, borderRadius: 'var(--r-sm)' }} />
                ))}
              </div>
            ) : rankData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-3)' }}>Nenhum jogador cadastrado ainda</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {rankData.map((p, i) => {
                  const isMe = p.id === profile?.id
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`
                  return (
                    <div key={p.id} onClick={() => { setShowRanking(false); setViewProfileId(p.id) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                        borderRadius: 'var(--r-md)',
                        background: isMe ? 'var(--accent-dim)' : 'var(--glass)',
                        border: isMe ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
                        cursor: isMe ? 'default' : 'pointer', transition: 'all .2s',
                      }}
                    >
                      <span style={{ width: 28, fontSize: 13, fontWeight: 700, color: i < 3 ? undefined : 'var(--text-3)', textAlign: 'center', flexShrink: 0 }}>{medal}</span>
                      {p.avatar_url ? (
                        <img src={p.avatar_url} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{p.avatar_emoji || '🧭'}</span>
                      )}
                      <span style={{
                        flex: 1, fontSize: 14, fontWeight: isMe ? 700 : 500,
                        color: isMe ? 'var(--accent)' : 'var(--text-1)',
                      }}>
                        {p.name || p.username}
                        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 6 }}>
                          @{p.username}
                        </span>
                        {isMe && <span style={{ fontSize: 11, color: 'var(--accent)', marginLeft: 6 }}>(você)</span>}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--amber)' }}>{p.total_pts} pts</span>
                    </div>
                  )
                })}
              </div>
            )}
            <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--glass)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Total de {rankData.length} {rankData.length === 1 ? 'guardião' : 'guardiões'} na Mantiqueira
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div onClick={() => { if (!showEditProfile) setShowSettings(false) }} style={{
          position: 'fixed', inset: 0, zIndex: 11000,
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
            borderRadius: 'var(--r-2xl)', width: '100%', maxWidth: 400, maxHeight: '90%',
            overflowY: 'auto', padding: 28,
            border: '0.5px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
          }}>
            {showEditProfile ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)' }}>✏️ Editar Perfil</h3>
                  <button onClick={() => { setShowEditProfile(false); setProfileMsg('') }}
                    style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
                  >✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ position: 'relative' }}>
                    {myProfile.profile?.avatar_url ? (
                      <img src={myProfile.profile.avatar_url} alt=""
                        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
                      />
                    ) : (
                      <div style={{
                        width: 100, height: 100, borderRadius: '50%',
                        background: 'var(--glass)', border: '2px solid var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44,
                      }}>
                        {profile?.avatar_emoji || '🧭'}
                      </div>
                    )}
                    <button onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: 'absolute', bottom: 0, right: -4,
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--accent)', color: '#060D07', fontSize: 16,
                        border: '2px solid var(--bg-void)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >📷</button>
                    <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
                    Nome
                  </label>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 'var(--r-md)',
                      background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                      color: 'var(--text-1)', fontSize: 16, outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6, display: 'block', fontWeight: 500 }}>
                    @usuario
                  </label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-3)', fontSize: 16 }}>@</span>
                    <input value={editUsername} onChange={e => handleEditUsername(e.target.value)}
                      style={{
                        flex: 1, padding: '12px 14px', borderRadius: 'var(--r-md)',
                        background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
                        color: 'var(--text-1)', fontSize: 16, outline: 'none',
                      }}
                    />
                  </div>
                  {editUsername !== profile?.username && editUsername.length >= 3 && (
                    <div style={{ fontSize: 12, marginTop: 4, color: checkingUsername ? 'var(--text-3)' : usernameAvailable ? 'var(--accent)' : 'var(--coral)' }}>
                      {checkingUsername ? 'Verificando...' : usernameAvailable ? '✓ Disponível' : '✗ Já está em uso'}
                    </div>
                  )}
                </div>

                {profileMsg && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 'var(--r-sm)', marginBottom: 16,
                    textAlign: 'center', fontSize: 13, fontWeight: 500,
                    background: profileMsg.includes('✅') ? 'var(--accent-dim)' : 'var(--coral-dim)',
                    color: profileMsg.includes('✅') ? 'var(--accent)' : 'var(--coral)',
                  }}>
                    {profileMsg}
                  </div>
                )}

                <button onClick={handleSaveProfile} disabled={savingProfile || !editName}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 'var(--r-md)',
                    background: 'var(--accent)', color: '#060D07', fontWeight: 600, fontSize: 15,
                    border: 'none', cursor: (savingProfile || !editName) ? 'not-allowed' : 'pointer',
                    opacity: (savingProfile || !editName) ? 0.5 : 1,
                    boxShadow: '0 4px 20px var(--accent-glow)',
                  }}
                >
                  {savingProfile ? 'Salvando...' : '💾 Salvar'}
                </button>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)' }}>⚙️ Configurações</h3>
                  <button onClick={() => setShowSettings(false)}
                    style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
                  >✕</button>
                </div>

                <div onClick={() => setShowEditProfile(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    background: 'var(--glass)', borderRadius: 'var(--r-lg)',
                    border: '0.5px solid var(--glass-border)', cursor: 'pointer', marginBottom: 24,
                    transition: 'all .2s',
                  }}
                >
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: 36 }}>{profile?.avatar_emoji || '🧭'}</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-1)' }}>
                      {profile?.name || profile?.username || 'Matago'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                      @{profile?.username || 'matago'} — Editar perfil
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-3)', fontSize: 18 }}>›</span>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 600, marginBottom: 12 }}>APARÊNCIA</h4>
                  <div style={{
                    display: 'flex', gap: 10,
                  }}>
                    <button onClick={() => setTheme('dark')}
                      style={{
                        flex: 1, padding: '14px 12px', borderRadius: 'var(--r-md)',
                        background: !themeT ? 'var(--accent-dim)' : 'var(--glass)',
                        border: !themeT ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
                        color: !themeT ? 'var(--accent)' : 'var(--text-2)',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all .2s',
                      }}
                    >
                      🌙 Escuro
                    </button>
                    <button onClick={() => setTheme('light')}
                      style={{
                        flex: 1, padding: '14px 12px', borderRadius: 'var(--r-md)',
                        background: themeT ? 'var(--accent-dim)' : 'var(--glass)',
                        border: themeT ? '0.5px solid var(--accent)' : '0.5px solid var(--glass-border)',
                        color: themeT ? 'var(--accent)' : 'var(--text-2)',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all .2s',
                      }}
                    >
                      ☀️ Claro
                    </button>
                  </div>
                </div>

                <div style={{ padding: '14px 16px', background: 'var(--glass)', borderRadius: 'var(--r-lg)', border: '0.5px solid var(--glass-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 4 }}>Sobre</div>
                  <div style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>MataGo v1.0</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    Guardião da Mantiqueira
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Expanded Photo Modal */}
      {expandedPhoto && (
        <div onClick={() => setExpandedPhoto(null)} style={{
          position: 'fixed', inset: 0, zIndex: 20000,
          background: 'rgba(0,0,0,.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'fadeIn .2s ease-out',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 500, maxHeight: '90%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setExpandedPhoto(null)}
              style={{ alignSelf: 'flex-end', width: 36, height: 36, borderRadius: '50%', background: 'var(--glass)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '0.5px solid var(--glass-border)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
            <img src={expandedPhoto.photo_url} alt={expandedPhoto.animals?.name || 'Foto'}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 'var(--r-xl)', background: 'var(--glass)' }}
            />
            <div style={{
              padding: '12px 16px', background: 'var(--glass-strong)',
              backdropFilter: 'var(--glass-blur-ultra)', WebkitBackdropFilter: 'var(--glass-blur-ultra)',
              borderRadius: 'var(--r-lg)', border: '0.5px solid var(--glass-border-light)',
            }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)' }}>
                {expandedPhoto.animals?.emoji} {expandedPhoto.animals?.name}
              </div>
              {expandedPhoto.profiles && (
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
                  {expandedPhoto.profiles.name || expandedPhoto.profiles.username}
                  <span style={{ color: 'var(--text-3)', marginLeft: 6 }}>
                    @{expandedPhoto.profiles.username}
                  </span>
                </div>
              )}
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
                {new Date(expandedPhoto.created_at).toLocaleDateString('pt-BR')}
              </div>
              {expandedPhoto.lat && expandedPhoto.lng && (
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                  📍 {expandedPhoto.lat.toFixed(4)}, {expandedPhoto.lng.toFixed(4)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showTimeline && (
        <TimelineSheet
          onClose={() => setShowTimeline(false)}
          onViewProfile={(id) => setViewProfileId(id)}
        />
      )}

      {showMySightings && (
        <MySightingsSheet
          sightings={sightings || []}
          deleteSighting={deleteSighting}
          onClose={() => setShowMySightings(false)}
        />
      )}

      {selectedId && (
        <AnimalDetailSheet animalId={selectedId} isSeen={seenIds.has(selectedId)} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
