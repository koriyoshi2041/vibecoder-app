import { useState, useEffect, useCallback } from 'react'
import { loadProgress, saveProgress, toggleMilestone, type UserProgress } from '../lib/progress'

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
}

export default function PathWeek({ week, stageColorBg, stageColorText }: Props) {
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

  return (
    <div className={`rounded-lg p-5 border border-light-beige ${stageColorBg} hover:shadow-[2px_2px_0_rgba(41,41,41,0.06)] transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={`font-mono text-xs font-bold ${stageColorText}`}>WEEK {week.number}</span>
          <h3 className="text-lg font-bold text-charcoal">{week.title}</h3>
        </div>
        {milestoneProgress > 0 && (
          <span className="text-xs font-mono text-warm-gray bg-paper px-2 py-0.5 rounded">
            {Math.round(milestoneProgress * 100)}%
          </span>
        )}
      </div>
      <p className="text-sm text-charcoal-light mb-4">{week.goal}</p>

      {milestoneProgress > 0 && (
        <div className="h-1 bg-light-beige/60 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-sage rounded-full transition-all duration-500"
            style={{ width: `${milestoneProgress * 100}%` }}
          />
        </div>
      )}

      {/* Project */}
      <div className="mb-3">
        <p className="text-xs font-mono text-warm-gray mb-1">项目</p>
        <p className="text-sm font-medium text-charcoal">{week.project}</p>
      </div>

      {/* Challenges - clickable links */}
      <div className="mb-3">
        <p className="text-xs font-mono text-warm-gray mb-2">品味挑战</p>
        <div className="flex flex-wrap gap-1.5">
          {week.challenges.map(ch => {
            const chId = ch.split(' ')[0]
            const isCompleted = progress?.completedChallenges.includes(chId)
            return (
              <a
                key={chId}
                href={`/challenges/${chId}`}
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border transition-colors ${
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

      {/* Milestones - interactive checkboxes */}
      <div>
        <p className="text-xs font-mono text-warm-gray mb-2">里程碑</p>
        <ul className="space-y-1.5">
          {week.milestones.map((m, i) => {
            const milestoneId = `w${week.number}-${i}`
            const checked = completedMilestones.includes(milestoneId)
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleToggleMilestone(i)}
                  className="flex items-start gap-2 text-sm text-charcoal-light cursor-pointer group w-full text-left"
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-sage border-sage text-white'
                        : 'border-warm-gray/40 group-hover:border-sage'
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
