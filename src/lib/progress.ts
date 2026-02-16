const STORAGE_KEY = 'vibecoder-progress'

export interface UserProgress {
  currentWeek: number
  completedChallenges: string[]
  completedMilestones: string[]
  completedProjects: string[]
  streak: number
  lastActiveDate: string
  totalXp: number
  challengeNotes: Record<string, string>
  challengeCriteria: Record<string, number[]>
}

function getDefaultProgress(): UserProgress {
  return {
    currentWeek: 1,
    completedChallenges: [],
    completedMilestones: [],
    completedProjects: [],
    streak: 0,
    lastActiveDate: '',
    totalXp: 0,
    challengeNotes: {},
    challengeCriteria: {},
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultProgress()
    return { ...getDefaultProgress(), ...JSON.parse(raw) }
  } catch {
    return getDefaultProgress()
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function toggleChallenge(progress: UserProgress, challengeId: string): UserProgress {
  const completed = progress.completedChallenges.includes(challengeId)
  const completedChallenges = completed
    ? progress.completedChallenges.filter(id => id !== challengeId)
    : [...progress.completedChallenges, challengeId]

  const xpDelta = completed ? -20 : 20

  return {
    ...progress,
    completedChallenges,
    totalXp: Math.max(0, progress.totalXp + xpDelta),
  }
}

export function toggleMilestone(progress: UserProgress, milestoneId: string): UserProgress {
  const completed = progress.completedMilestones.includes(milestoneId)
  const completedMilestones = completed
    ? progress.completedMilestones.filter(id => id !== milestoneId)
    : [...progress.completedMilestones, milestoneId]

  const xpDelta = completed ? -10 : 10

  return {
    ...progress,
    completedMilestones,
    totalXp: Math.max(0, progress.totalXp + xpDelta),
  }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0]
  if (progress.lastActiveDate === today) return progress

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const streak = progress.lastActiveDate === yesterday ? progress.streak + 1 : 1

  return {
    ...progress,
    streak,
    lastActiveDate: today,
  }
}

export function getStage(week: number): { id: string; label: string } {
  if (week <= 3) return { id: 'observer', label: '观察者' }
  if (week <= 6) return { id: 'practitioner', label: '实践者' }
  if (week <= 9) return { id: 'critic', label: '评论家' }
  return { id: 'creator', label: '创造者' }
}

export function getLevel(xp: number): number {
  if (xp >= 3000) return 4
  if (xp >= 1500) return 3
  if (xp >= 500) return 2
  return 1
}

export function saveChallengeNote(progress: UserProgress, challengeId: string, note: string): UserProgress {
  return {
    ...progress,
    challengeNotes: {
      ...progress.challengeNotes,
      [challengeId]: note,
    },
  }
}

export function toggleCriterion(progress: UserProgress, challengeId: string, criterionIndex: number): UserProgress {
  const current = progress.challengeCriteria[challengeId] || []
  const completed = current.includes(criterionIndex)
  const updated = completed
    ? current.filter(i => i !== criterionIndex)
    : [...current, criterionIndex]

  return {
    ...progress,
    challengeCriteria: {
      ...progress.challengeCriteria,
      [challengeId]: updated,
    },
  }
}
