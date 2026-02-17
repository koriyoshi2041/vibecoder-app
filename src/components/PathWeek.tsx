import { useState, useEffect, useCallback } from 'react'
import { loadProgress, saveProgress, toggleMilestone, type UserProgress } from '../lib/progress'
import { t } from '../i18n'
import type { Locale } from '../i18n'

interface WeekData {
  number: number
  title: string
  stage: string
  goal: string
  project: string
  challenges: string[]
  milestones: string[]
}

interface Props {
  week: WeekData
  stageColorBg: string
  stageColorText: string
  locale?: Locale
}

export default function PathWeek({ week, stageColorBg, stageColorText, locale = 'zh' }: Props) {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const handleToggleMilestone = useCallback((milestoneIndex: number) => {
    if (!progress) return
    const milestoneId = `w${week.number}-${milestoneIndex}`
    const updated = toggleMilestone(progress, milestoneId)
    saveProgress(updated)
    setProgress(updated)
  }, [progress, week.number])

  const completedMilestones = progress?.completedMilestones || []
  const milestoneProgress = week.milestones.length > 0
    ? week.milestones.filter((_, i) => completedMilestones.includes(`w${week.number}-${i}`)).length / week.milestones.length
    : 0

  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div className={`rounded-xl p-6 border border-light-beige/80 ${stageColorBg} hover:shadow-md transition-all duration-500`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`font-mono text-[11px] font-bold ${stageColorText} tracking-wide`}>WEEK {week.number}</span>
          <h3 className="font-serif text-lg font-bold text-charcoal mt-0.5">{week.title}</h3>
        </div>
        {milestoneProgress > 0 && (
          <span className="text-[11px] font-mono text-warm-gray bg-paper px-2 py-0.5 rounded-md">
            {Math.round(milestoneProgress * 100)}%
          </span>
        )}
      </div>
      <p className="text-sm text-charcoal-light mb-5 leading-relaxed">{week.goal}</p>

      {milestoneProgress > 0 && (
        <div className="h-1 bg-light-beige/60 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-sage rounded-full transition-all duration-700 ease-out"
            style={{ width: `${milestoneProgress * 100}%` }}
          />
        </div>
      )}

      {/* Project */}
      <div className="mb-4">
        <p className="text-[10px] font-mono text-warm-gray tracking-[0.12em] uppercase mb-1.5">{t('path.project', locale)}</p>
        <p className="text-sm font-medium text-charcoal">{week.project}</p>
      </div>

      {/* Challenges */}
      <div className="mb-4">
        <p className="text-[10px] font-mono text-warm-gray tracking-[0.12em] uppercase mb-2">{t('path.challenges', locale)}</p>
        <div className="flex flex-wrap gap-1.5">
          {week.challenges.map(ch => {
            const chId = ch.split(' ')[0]
            const isCompleted = progress?.completedChallenges.includes(chId)
            return (
              <a
                key={chId}
                href={`${prefix}/challenges/${chId}`}
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-sage-light border-sage/30 hover:border-sage'
                    : 'bg-paper border-light-beige hover:border-rust hover:bg-paper-dark'
                }`}
              >
                <span className={`font-bold mr-1 ${isCompleted ? 'text-sage' : 'text-rust'}`}>{chId}</span>
                <span className="text-charcoal-light">{ch.slice(chId.length + 1)}</span>
                {isCompleted && (
                  <svg className="w-3 h-3 ml-1 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </a>
            )
          })}
        </div>
      </div>

      {/* Milestones */}
      <div>
        <p className="text-[10px] font-mono text-warm-gray tracking-[0.12em] uppercase mb-2">{t('path.milestones', locale)}</p>
        <ul className="space-y-2">
          {week.milestones.map((m, i) => {
            const milestoneId = `w${week.number}-${i}`
            const checked = completedMilestones.includes(milestoneId)
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleToggleMilestone(i)}
                  className="flex items-start gap-2.5 text-sm text-charcoal-light cursor-pointer group w-full text-left"
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      checked
                        ? 'bg-sage border-sage text-white'
                        : 'border-warm-gray/30 group-hover:border-sage'
                    }`}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`transition-colors ${checked ? 'line-through text-warm-gray' : ''}`}>
                    {m}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
