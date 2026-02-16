import { useState, useEffect } from 'react'
import { categories, type ChallengeCategory } from '../data/challenges'
import { loadProgress, saveProgress, toggleChallenge } from '../lib/progress'

export default function ChallengeFilter() {
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

  function handleToggle(challengeId: string) {
    const progress = loadProgress()
    const updated = toggleChallenge(progress, challengeId)
    saveProgress(updated)
    setCompletedIds(updated.completedChallenges)
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
        <FilterButton
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          label={`全部 (${totalCompleted}/153)`}
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
      <div className="space-y-8">
        {filteredCategories.map(cat => (
          <CategorySection
            key={cat.id}
            category={cat}
            completedIds={completedIds}
            onToggle={handleToggle}
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
      className={`whitespace-nowrap px-3 py-1.5 text-sm rounded transition-colors shrink-0 ${
        active
          ? 'bg-rust text-paper font-medium'
          : 'bg-paper text-charcoal-light border border-light-beige hover:bg-light-beige'
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
}: {
  category: ChallengeCategory
  completedIds: string[]
  onToggle: (id: string) => void
}) {
  const catCompleted = completedIds.filter(id => id.startsWith(category.prefix)).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{category.icon}</span>
        <div>
          <h2 className="text-lg font-bold text-charcoal">{category.name}</h2>
          <p className="text-xs text-warm-gray">{category.description} · {catCompleted}/{category.count} 完成</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.challenges.map(ch => {
          const isCompleted = completedIds.includes(ch.id)
          return (
            <div
              key={ch.id}
              className={`group relative rounded-lg p-4 border transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-sage-light border-sage/30'
                  : 'bg-paper border-light-beige hover:border-warm-gray hover:shadow-[2px_2px_0_rgba(41,41,41,0.08)]'
              }`}
              onClick={() => onToggle(ch.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-xs font-bold text-rust">{ch.id}</span>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isCompleted
                    ? 'bg-sage border-sage text-white'
                    : 'border-light-beige group-hover:border-warm-gray'
                }`}>
                  {isCompleted && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-sm text-charcoal mb-1">{ch.title}</h3>
              <p className="text-xs text-warm-gray mb-2 line-clamp-2">{ch.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-warm-gray font-mono">{ch.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  ch.difficulty === '入门' ? 'bg-sage-light text-sage' :
                  ch.difficulty === '中级' ? 'bg-cream/40 text-bronze' :
                  'bg-dusty-rose-light text-dusty-rose'
                }`}>
                  {ch.difficulty}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
