import { useState, useEffect } from 'react'
import { categories as zhCategories, type ChallengeCategory } from '../data/challenges'
import { categories as enCategories } from '../data/challenges.en'
import { loadProgress, saveProgress, toggleChallenge } from '../lib/progress'
import { t } from '../i18n'
import type { Locale } from '../i18n'

interface Props {
  locale?: Locale
}

export default function ChallengeFilter({ locale = 'zh' }: Props) {
  const categories = locale === 'en' ? enCategories : zhCategories
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [completedIds, setCompletedIds] = useState<string[]>([])

  useEffect(() => {
    const p = loadProgress()
    setCompletedIds(p.completedChallenges)
  }, [])

  const filteredCategories = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategory)

  const totalCompleted = completedIds.length

  function handleToggle(e: React.MouseEvent, challengeId: string) {
    e.preventDefault()
    e.stopPropagation()
    const progress = loadProgress()
    const updated = toggleChallenge(progress, challengeId)
    saveProgress(updated)
    setCompletedIds(updated.completedChallenges)
  }

  const prefix = locale === 'en' ? '/en' : ''

  const difficultyMap: Record<string, string> = locale === 'en'
    ? { '入门': t('difficulty.beginner', 'en'), '中级': t('difficulty.intermediate', 'en'), '高级': t('difficulty.advanced', 'en') }
    : {}

  function displayDifficulty(d: string): string {
    if (locale === 'en' && difficultyMap[d]) return difficultyMap[d]
    return d
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 -mx-1 px-1 scrollbar-hide">
        <FilterButton
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          label={`${t('challenges.all', locale)} (${totalCompleted}/153)`}
        />
        {categories.map(cat => {
          const catCompleted = completedIds.filter(id => id.startsWith(cat.prefix)).length
          return (
            <FilterButton
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              label={`${cat.icon} ${cat.prefix} (${catCompleted}/${cat.count})`}
            />
          )
        })}
      </div>

      {/* Challenge grid */}
      <div className="space-y-10">
        {filteredCategories.map(cat => (
          <CategorySection
            key={cat.id}
            category={cat}
            completedIds={completedIds}
            onToggle={handleToggle}
            locale={locale}
            prefix={prefix}
            displayDifficulty={displayDifficulty}
          />
        ))}
      </div>
    </div>
  )
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3.5 py-2 text-sm rounded-lg transition-all duration-300 shrink-0 ${
        active
          ? 'bg-rust text-paper font-medium shadow-sm'
          : 'bg-paper text-charcoal-light border border-light-beige hover:border-rust/40 hover:bg-paper-dark'
      }`}
    >
      {label}
    </button>
  )
}

function CategorySection({
  category,
  completedIds,
  onToggle,
  locale,
  prefix,
  displayDifficulty,
}: {
  category: ChallengeCategory
  completedIds: string[]
  onToggle: (e: React.MouseEvent, id: string) => void
  locale: Locale
  prefix: string
  displayDifficulty: (d: string) => string
}) {
  const catCompleted = completedIds.filter(id => id.startsWith(category.prefix)).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">{category.icon}</span>
        <div>
          <h2 className="font-serif text-lg font-bold text-charcoal">{category.name}</h2>
          <p className="text-xs text-warm-gray">{category.description} · {catCompleted}/{category.count} {t('challenges.completed', locale)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.challenges.map(ch => {
          const isCompleted = completedIds.includes(ch.id)
          return (
            <a
              key={ch.id}
              href={`${prefix}/challenges/${ch.id}`}
              className={`group relative rounded-xl p-5 border transition-all duration-400 block ${
                isCompleted
                  ? 'bg-sage-light border-sage/20 hover:border-sage/50'
                  : 'bg-paper border-light-beige hover:border-rust/40 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <div className="flex items-start justify-between mb-2.5">
                <span className="font-mono text-xs font-bold text-rust">{ch.id}</span>
                <button
                  type="button"
                  onClick={(e) => onToggle(e, ch.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-sage border-sage text-white'
                      : 'border-light-beige group-hover:border-warm-gray hover:border-sage'
                  }`}
                  aria-label={isCompleted ? t('challenges.unmarkComplete', locale) : t('challenges.markComplete', locale)}
                >
                  {isCompleted && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
              <h3 className="font-semibold text-sm text-charcoal mb-1.5 group-hover:text-rust transition-colors">{ch.title}</h3>
              <p className="text-xs text-warm-gray mb-3 line-clamp-2 leading-relaxed">{ch.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-warm-gray font-mono">{ch.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  ch.difficulty === '入门' || ch.difficulty === 'Beginner' ? 'bg-sage-light text-sage' :
                  ch.difficulty === '中级' || ch.difficulty === 'Intermediate' ? 'bg-cream/40 text-bronze' :
                  'bg-dusty-rose-light text-dusty-rose'
                }`}>
                  {displayDifficulty(ch.difficulty)}
                </span>
                <span className="ml-auto text-warm-gray/40 group-hover:text-rust transition-colors text-[11px]">
                  {t('challenges.view', locale)} &rarr;
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
