import { useState, useEffect } from 'react'
import { loadProgress, saveProgress, updateStreak, getStage, getLevel, type UserProgress } from '../lib/progress'
import { weeks as zhWeeks } from '../data/weeks'
import { weeks as enWeeks } from '../data/weeks.en'
import { t } from '../i18n'
import type { Locale } from '../i18n'

interface Props {
  locale?: Locale
}

export default function ProgressDashboard({ locale = 'zh' }: Props) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const weeks = locale === 'en' ? enWeeks : zhWeeks

  useEffect(() => {
    const p = loadProgress()
    const updated = updateStreak(p)
    if (updated !== p) saveProgress(updated)
    setProgress(updated)
  }, [])

  if (!progress) return null

  const stage = getStage(progress.currentWeek)
  const level = getLevel(progress.totalXp)
  const currentWeekData = weeks[progress.currentWeek - 1]
  const weekProgress = currentWeekData
    ? currentWeekData.milestones.filter(m =>
        progress.completedMilestones.includes(`w${progress.currentWeek}-${currentWeekData.milestones.indexOf(m)}`)
      ).length / currentWeekData.milestones.length
    : 0

  const stageColors: Record<string, string> = {
    observer: 'bg-sage text-white',
    practitioner: 'bg-terracotta text-white',
    critic: 'bg-dusty-rose text-white',
    creator: 'bg-rust text-white',
  }

  const levelThresholds = [0, 500, 1500, 3000]
  const nextThreshold = levelThresholds[level] || 5000
  const prevThreshold = levelThresholds[level - 1] || 0
  const xpProgress = (progress.totalXp - prevThreshold) / (nextThreshold - prevThreshold)

  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div className="space-y-6">
      {/* Stage & XP Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${stageColors[stage.id]}`}>
          {stage.id === 'observer' && '👁️'}
          {stage.id === 'practitioner' && '🔨'}
          {stage.id === 'critic' && '🔍'}
          {stage.id === 'creator' && '🚀'}
          {stage.label} · Level {level}
        </span>
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs text-warm-gray mb-1">
            <span>{progress.totalXp} XP</span>
            <span>{nextThreshold} XP</span>
          </div>
          <div className="h-2 bg-light-beige rounded-full overflow-hidden">
            <div
              className="h-full bg-rust rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, xpProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label={t('progress.streak', locale)}
          value={`${progress.streak}${t('progress.streakUnit', locale)}`}
          icon="🔥"
        />
        <StatCard
          label={t('progress.currentWeek', locale)}
          value={`${t('progress.currentWeekPrefix', locale)}${progress.currentWeek}${t('progress.currentWeekSuffix', locale)}`}
          icon="📅"
        />
        <StatCard
          label={t('progress.completedChallenges', locale)}
          value={`${progress.completedChallenges.length}/153`}
          icon="✅"
        />
        <StatCard
          label={t('progress.totalXp', locale)}
          value={`${progress.totalXp} XP`}
          icon="⭐"
        />
      </div>

      {/* Current Week */}
      {currentWeekData && (
        <div className="bg-light-beige/60 rounded-lg p-5 border border-light-beige">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-charcoal">
              {t('progress.currentWeekPrefix', locale)}{currentWeekData.number}{t('progress.currentWeekSuffix', locale)}{locale === 'zh' ? '：' : ': '}{currentWeekData.title}
            </h3>
            <span className="text-xs font-mono text-warm-gray">
              {Math.round(weekProgress * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-paper rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-sage rounded-full transition-all duration-500"
              style={{ width: `${weekProgress * 100}%` }}
            />
          </div>
          <p className="text-sm text-charcoal-light mb-4">{currentWeekData.goal}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`${prefix}/path`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rust text-paper text-sm rounded hover:bg-bronze transition-colors"
            >
              {t('progress.viewPath', locale)}
            </a>
            <a
              href={`${prefix}/challenges`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-paper text-charcoal text-sm rounded border border-light-beige hover:bg-light-beige transition-colors"
            >
              {t('progress.browseChallenges', locale)}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-paper rounded-lg p-3 border border-light-beige text-center">
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-lg font-bold text-charcoal font-mono">{value}</div>
      <div className="text-xs text-warm-gray">{label}</div>
    </div>
  )
}
