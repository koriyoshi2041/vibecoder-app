import { useState, useEffect, useRef } from 'react'
import { loadProgress, saveProgress, updateStreak, getStage, getLevel, type UserProgress } from '../lib/progress'
import { weeks as zhWeeks } from '../data/weeks'
import { weeks as enWeeks } from '../data/weeks.en'
import { t } from '../i18n'
import type { Locale } from '../i18n'
import { Flame, Calendar, CheckCircle, Star, ArrowRight, BookOpen, Eye, Wrench, Search, Sparkles } from 'lucide-react'

interface Props {
  locale?: Locale
}

const stageIconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  observer: Eye,
  practitioner: Wrench,
  critic: Search,
  creator: Sparkles,
}

function useCountUp(end: number, duration = 1200) {
  const [current, setCurrent] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    let frame: number

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * end))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [end, duration])

  return current
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
  const StageIcon = stageIconMap[stage.id]

  return (
    <div className="space-y-6">
      {/* Stage & XP Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${stageColors[stage.id]}`}>
          {StageIcon && <StageIcon size={15} strokeWidth={2} />}
          {stage.label} · Level {level}
        </span>
        <div className="flex-1 w-full">
          <div className="flex justify-between text-[11px] text-warm-gray mb-1.5 font-mono">
            <span>{progress.totalXp} XP</span>
            <span>{nextThreshold} XP</span>
          </div>
          <div className="h-2.5 bg-light-beige rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rust to-bronze rounded-full xp-shimmer transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(2, Math.min(100, xpProgress * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label={t('progress.streak', locale)}
          value={progress.streak}
          suffix={t('progress.streakUnit', locale)}
          icon={<Flame size={18} strokeWidth={1.8} />}
          iconColor="text-terracotta"
        />
        <StatCard
          label={t('progress.currentWeek', locale)}
          value={progress.currentWeek}
          prefix={t('progress.currentWeekPrefix', locale)}
          suffix={t('progress.currentWeekSuffix', locale)}
          icon={<Calendar size={18} strokeWidth={1.8} />}
          iconColor="text-rust"
        />
        <StatCard
          label={t('progress.completedChallenges', locale)}
          value={progress.completedChallenges.length}
          suffix="/153"
          icon={<CheckCircle size={18} strokeWidth={1.8} />}
          iconColor="text-sage"
        />
        <StatCard
          label={t('progress.totalXp', locale)}
          value={progress.totalXp}
          suffix=" XP"
          icon={<Star size={18} strokeWidth={1.8} />}
          iconColor="text-bronze"
        />
      </div>

      {/* Current Week */}
      {currentWeekData && (
        <div className="bg-light-beige/40 rounded-xl p-6 border border-light-beige/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-charcoal">
              {t('progress.currentWeekPrefix', locale)}{currentWeekData.number}{t('progress.currentWeekSuffix', locale)}{locale === 'zh' ? '：' : ': '}{currentWeekData.title}
            </h3>
            <span className="text-[11px] font-mono text-warm-gray">
              {Math.round(weekProgress * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-paper rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-sage rounded-full transition-all duration-700 ease-out"
              style={{ width: `${weekProgress * 100}%` }}
            />
          </div>
          <p className="text-sm text-charcoal-light mb-5 leading-relaxed">{currentWeekData.goal}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${prefix}/path`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rust text-paper text-sm rounded-lg hover:bg-bronze transition-colors duration-300"
            >
              <ArrowRight size={14} strokeWidth={2} />
              {t('progress.viewPath', locale)}
            </a>
            <a
              href={`${prefix}/challenges`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-paper text-charcoal text-sm rounded-lg border border-light-beige hover:bg-light-beige transition-colors duration-300"
            >
              <BookOpen size={14} strokeWidth={2} />
              {t('progress.browseChallenges', locale)}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, suffix = '', prefix = '', icon, iconColor }: {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: React.ReactNode
  iconColor: string
}) {
  const count = useCountUp(value)

  return (
    <div className="bg-paper rounded-xl p-4 border border-light-beige/60 text-center hover:shadow-sm transition-shadow duration-300">
      <div className={`flex justify-center mb-1.5 ${iconColor}`}>
        {icon}
      </div>
      <div className="text-lg font-bold text-charcoal font-mono stat-number">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[11px] text-warm-gray mt-0.5">{label}</div>
    </div>
  )
}
