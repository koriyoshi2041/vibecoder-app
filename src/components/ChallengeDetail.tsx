import { useState, useEffect, useCallback } from 'react'
import {
  loadProgress,
  saveProgress,
  toggleChallenge,
  toggleCriterion,
  saveChallengeNote,
  type UserProgress,
} from '../lib/progress'

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
    difficulty === '入门' ? 'bg-sage-light text-sage' :
    difficulty === '中级' ? 'bg-cream/40 text-bronze' :
    'bg-dusty-rose-light text-dusty-rose'

  const criteriaProgress = criteria.length > 0
    ? completedCriteria.length / criteria.length
    : 0

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-gray mb-6">
        <a href="/challenges" className="hover:text-rust transition-colors">品味挑战</a>
        <span>/</span>
        <span>{categoryIcon} {categoryName}</span>
        <span>/</span>
        <span className="text-charcoal font-medium">{id}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-sm font-bold text-rust">{id}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyStyle}`}>
            {difficulty}
          </span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-sage text-white">
              已完成
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3">{title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-warm-gray">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </span>
          {repeatable && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {repeatable}
            </span>
          )}
        </div>
      </div>

      {/* Content — HTML generated from our own markdown at build time, not user input */}
      <div
        className="challenge-content mb-8"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Evaluation Criteria */}
      {criteria.length > 0 && (
        <div className="mb-8 rounded-lg border border-light-beige bg-paper-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-charcoal">评判标准（自测）</h2>
            <span className="text-xs font-mono text-warm-gray">
              {completedCriteria.length}/{criteria.length}
            </span>
          </div>
          <div className="h-1.5 bg-light-beige rounded-full overflow-hidden mb-4">
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
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checked
                          ? 'bg-sage border-sage text-white'
                          : 'border-warm-gray/40 group-hover:border-sage'
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
        <div className="mb-8 rounded-lg border border-sage/30 bg-sage-light p-5">
          <h2 className="text-sm font-mono text-sage font-bold mb-2">你会学到</h2>
          <p className="text-sm text-charcoal-light leading-relaxed">{learnings}</p>
        </div>
      )}

      {/* Notes */}
      <div className="mb-8 rounded-lg border border-light-beige bg-paper p-5">
        <h2 className="text-lg font-bold text-charcoal mb-3">我的笔记</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="记录你的思考、发现和反思..."
          className="w-full h-32 p-3 bg-paper-dark rounded-lg border border-light-beige text-sm text-charcoal placeholder-warm-gray/60 resize-y focus:outline-none focus:border-rust/40 transition-colors"
        />
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handleSaveNote}
            className="px-4 py-1.5 bg-rust text-paper text-sm rounded hover:bg-bronze transition-colors"
          >
            保存笔记
          </button>
          {noteSaved && (
            <span className="text-xs text-sage font-medium">已保存</span>
          )}
        </div>
      </div>

      {/* Complete Button */}
      <div className="mb-10">
        <button
          onClick={handleToggleComplete}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${
            isCompleted
              ? 'bg-sage text-white hover:bg-sage/80'
              : 'bg-charcoal text-paper hover:bg-charcoal-light'
          }`}
        >
          {isCompleted ? '✓ 已完成此挑战 · 点击取消' : '标记为完成 (+20 XP)'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-light-beige">
        {prevId ? (
          <a
            href={`/challenges/${prevId}`}
            className="flex items-center gap-2 text-sm text-charcoal-light hover:text-rust transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>上一个: <span className="font-mono font-bold">{prevId}</span></span>
          </a>
        ) : <div />}
        <a
          href="/challenges"
          className="text-sm text-warm-gray hover:text-rust transition-colors"
        >
          返回列表
        </a>
        {nextId ? (
          <a
            href={`/challenges/${nextId}`}
            className="flex items-center gap-2 text-sm text-charcoal-light hover:text-rust transition-colors group"
          >
            <span>下一个: <span className="font-mono font-bold">{nextId}</span></span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ) : <div />}
      </div>
    </div>
  )
}
