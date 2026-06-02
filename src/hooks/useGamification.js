import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import { LEVEL_REWARD_PTS, STREAK_REWARDS, BADGE_REWARDS, calcLevel, getMonthlyMissions, checkMonthlyMission } from '../lib/constants'

export default function useGamification({ profile, sightings, seenIds = new Set(), userId }) {
  const [claimedLevels, setClaimedLevels] = useState(profile?.claimed_levels || 1)
  const [claimedStreaks, setClaimedStreaks] = useState(profile?.claimed_streaks || [])
  const [claimedBadges, setClaimedBadges] = useState(profile?.claimed_badges || [])
  const [claimedMonthly, setClaimedMonthly] = useState(profile?.claimed_monthly_missions || {})

  useEffect(() => {
    if (profile) {
      setClaimedLevels(profile.claimed_levels || 1)
      setClaimedStreaks(profile.claimed_streaks || [])
      setClaimedBadges(profile.claimed_badges || [])
      setClaimedMonthly(profile.claimed_monthly_missions || {})
    }
  }, [profile])

  const levelData = useMemo(() => calcLevel(profile?.total_pts || 0), [profile?.total_pts])
  const canLevelUp = levelData.level > claimedLevels
  const pendingLevelClaims = canLevelUp ? levelData.level - claimedLevels : 0

  const streakDay = profile?.streak_days || 0
  const availableStreakRewards = useMemo(() => {
    return STREAK_REWARDS.filter(sr => streakDay >= sr.days && !claimedStreaks.includes(sr.days))
  }, [streakDay, claimedStreaks])

  const badgesWithReward = useMemo(() => {
    const result = []
    for (const [id, reward] of Object.entries(BADGE_REWARDS)) {
      if (!claimedBadges.includes(id)) {
        result.push({ id, reward })
      }
    }
    return result
  }, [claimedBadges])

  const monthMissions = useMemo(() => {
    const now = new Date()
    const month = now.getMonth()
    return getMonthlyMissions(month)
  }, [])

  const monthMissionsStatus = useMemo(() => {
    if (!seenIds || !sightings) return []
    const monthKey = getMonthKey()
    const saved = claimedMonthly[monthKey] || []
    return monthMissions.map(m => ({
      ...m,
      completed: checkMonthlyMission(m, seenIds, profile, sightings),
      claimed: saved.includes(m.id),
    }))
  }, [monthMissions, seenIds, profile, sightings, claimedMonthly])

  const claimLevelReward = useCallback(async () => {
    if (!canLevelUp || !userId) return { error: 'Nada a reivindicar' }
    const { data, error } = await supabase.rpc('claim_level_reward', {
      p_user_id: userId,
      p_target_level: levelData.level,
    })
    if (error) return { error }
    setClaimedLevels(levelData.level)
    return data
  }, [canLevelUp, userId, levelData])

  const claimStreakReward = useCallback(async (milestone, reward) => {
    if (!userId) return { error: 'Usuário não encontrado' }
    const { data, error } = await supabase.rpc('claim_streak_reward', {
      p_user_id: userId,
      p_milestone: milestone,
      p_reward: reward,
    })
    if (error) return { error }
    setClaimedStreaks(prev => [...prev, milestone])
    return data
  }, [userId])

  const claimBadgeReward = useCallback(async (badgeId, reward) => {
    if (!userId) return { error: 'Usuário não encontrado' }
    const { data, error } = await supabase.rpc('claim_badge_reward', {
      p_user_id: userId,
      p_badge_id: badgeId,
      p_reward: reward,
    })
    if (error) return { error }
    setClaimedBadges(prev => [...prev, badgeId])
    return data
  }, [userId])

  const claimMonthlyMission = useCallback(async (missionId, reward) => {
    if (!userId) return { error: 'Usuário não encontrado' }
    const { data, error } = await supabase.rpc('claim_monthly_mission', {
      p_user_id: userId,
      p_key: `${getMonthKey()}_${missionId}`,
      p_reward: reward,
    })
    if (error) return { error }
    const monthKey = getMonthKey()
    setClaimedMonthly(prev => ({
      ...prev,
      [monthKey]: [...(prev[monthKey] || []), missionId],
    }))
    return data
  }, [userId])

  return {
    levelData,
    canLevelUp,
    pendingLevelClaims,
    claimLevelReward,
    streakDay,
    availableStreakRewards,
    claimStreakReward,
    badgesWithReward,
    claimBadgeReward,
    monthMissionsStatus,
    claimMonthlyMission,
  }
}

function getMonthKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
