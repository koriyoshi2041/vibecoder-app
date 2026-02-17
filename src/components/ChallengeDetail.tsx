import { useState, useEffect, useCallback } from 'react'
import {
  loadProgress,
  saveProgress,
  toggleChallenge,
  toggleCriterion,
  saveChallengeNote,
  type UserProgress,
} from '../lib/progress'
import { t } from '../i18n'
import type { Locale } from '../i18n'

interface Props {
  id: string
  title: string
  time: string
  difficulty: string
  repeatable: string
  /** Pre-rendered HTML from our own markdown files, processed at build time by marked. Not user input. */
  contentHtml: string
  criteria: string[]
  learnings: string
  prevId: string | null
  nextId: string | null
  categoryName: string
  categoryIcon: string
  locale?: Locale
}

export default function ChallengeDetail({
  id,
  title,
  time,
  difficulty,
  repeatable,
  contentHtml,
  criteria,
  learnings,
  prevId,
  nextId,
  categoryName,
  categoryIcon,
  locale = 'zh',
}: Props) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)

  useEffect(() => {
    const p = loadProgress()
    setProgress(p)
    setNote(p.challengeNotes[id] || '')
  }, [id])

  const isCompleted = progress?.completedChallenges.includes(id) ?? false
  const completedCriteria = progress?.challengeCriteria[id] || []

  const handleToggleComplete = useCallback(() => {
    if (!progress) return
    const updated = toggleChallenge(progress, id)
    saveProgress(updated)
    setProgress(updated)
  }, [progress, id])

  const handleToggleCriterion = useCallback((index: number) => {
    if (!progress) return
    const updated = toggleCriterion(progress, id, index)
    saveProgress(updated)
    setProgress(updated)
  }, [progress, id])

  const handleSaveNote = useCallback(() => {
    if (!progress) return
    const updated = saveChallengeNote(progress, id, note)
    saveProgress(updated)
    setProgress(updated)
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }, [progress, id, note])

  const difficultyStyle =
    difficulty === '入门' || difficulty === 'Beginner' ? 'bg-sage-light text-sage' :
    difficulty === '中级' || difficulty === 'Intermediate' ? 'bg-cream/40 text-bronze' :
    'bg-dusty-rose-light text-dusty-rose'

  const criteriaProgress = criteria.length > 0
    ? completedCriteria.length / criteria.length
    : 0

  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-gray mb-8">
        <a href={`${prefix}/challenges`} className="hover:text-rust transition-colors">{t('challenge.breadcrumb', locale)}</a>
        <span className="text-light-beige">/</span>
        <span>{categoryIcon} {categoryName}</span>
        <span className="text-light-beige">/</span>
        <span className="text-charcoal font-medium">{id}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-sm font-bold text-rust">{id}</span>
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${difficultyStyle}`}>
            {difficulty}
          </span>
          {isCompleted && (
            <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-sage text-white">
              {t('challenge.completed', locale)}
            </span>
          )}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">{title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-warm-gray">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </span>
          {repeatable && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {repeatable}
            </span>
          )}
        </div>
      </div>

      {/* Content — HTML generated from our own markdown at build time, not user input. Safe to render. */}
      <div
        className="challenge-content mb-10"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Evaluation Criteria */}
      {criteria.length > 0 && (
        <div className="mb-10 rounded-xl border border-light-beige bg-paper-dark p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-bold text-charcoal">{t('challenge.criteria', locale)}</h2>
            <span className="text-xs font-mono text-warm-gray">
              {completedCriteria.length}/{criteria.length}
            </span>
          </div>
          <div className="h-1.5 bg-light-beige rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-sage rounded-full transition-all duration-500"
              style={{ width: `${criteriaProgress * 100}%` }}
            />
          </div>
          <ul className="space-y-3">
            {criteria.map((criterion, index) => {
              const checked = completedCriteria.includes(index)
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleToggleCriterion(index)}
                    className="flex items-start gap-3 w-full text-left cursor-pointer group"
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        checked
                          ? 'bg-sage border-sage text-white'
                          : 'border-warm-gray/30 group-hover:border-sage'
                      }`}
                    >
                      {checked && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed transition-colors ${
                        checked ? 'text-warm-gray line-through' : 'text-charcoal'
                      }`}
                    >
                      {criterion}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Learnings */}
      {learnings && (
        <div className="mb-10 rounded-xl border border-sage/20 bg-sage-light p-6">
          <h2 className="text-[10px] font-mono text-sage font-bold tracking-[0.15em] uppercase mb-2">{t('challenge.learnings', locale)}</h2>
          <p className="text-sm text-charcoal-light leading-relaxed">{learnings}</p>
        </div>
      )}

      {/* Notes */}
      <div className="mb-10 rounded-xl border border-light-beige bg-paper p-6">
        <h2 className="font-serif text-lg font-bold text-charcoal mb-4">{t('challenge.notes', locale)}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t('challenge.notesPlaceholder', locale)}
          className="w-full h-32 p-4 bg-paper-dark rounded-lg border border-light-beige text-sm text-charcoal placeholder-warm-gray/50 resize-y focus:outline-none focus:border-rust/40 transition-colors"
        />
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleSaveNote}
            className="px-5 py-2 bg-rust text-paper text-sm rounded-lg hover:bg-bronze transition-colors duration-300"
          >
            {t('challenge.saveNote', locale)}
          </button>
          {noteSaved && (
            <span className="text-xs text-sage font-medium">{t('challenge.saved', locale)}</span>
          )}
        </div>
      </div>

      {/* Complete Button */}
      <div className="mb-12">
        <button
          onClick={handleToggleComplete}
          className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-400 ${
            isCompleted
              ? 'bg-sage text-white hover:bg-sage/80'
              : 'bg-charcoal text-paper hover:bg-charcoal-light'
          }`}
        >
          {isCompleted ? t('challenge.completedToggle', locale) : t('challenge.complete', locale)}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-light-beige">
        {prevId ? (
          <a
            href={`${prefix}/challenges/${prevId}`}
            className="flex items-center gap-2 text-sm text-charcoal-light hover:text-rust transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('challenge.prev', locale)}: <span className="font-mono font-bold">{prevId}</span></span>
          </a>
        ) : <div />}
        <a
          href={`${prefix}/challenges`}
          className="text-sm text-warm-gray hover:text-rust transition-colors"
        >
          {t('challenge.backToList', locale)}
        </a>
        {nextId ? (
          <a
            href={`${prefix}/challenges/${nextId}`}
            className="flex items-center gap-2 text-sm text-charcoal-light hover:text-rust transition-colors group"
          >
            <span>{t('challenge.next', locale)}: <span className="font-mono font-bold">{nextId}</span></span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ) : <div />}
      </div>
    </div>
  )
}
