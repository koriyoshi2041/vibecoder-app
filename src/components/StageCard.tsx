import { useRef, useCallback } from 'react'
import { Eye, Wrench, Search, Sparkles } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  eye: Eye,
  wrench: Wrench,
  search: Search,
  sparkles: Sparkles,
}

const colorMap: Record<string, { bg: string; border: string; icon: string; accent: string }> = {
  sage: { bg: 'bg-sage-light', border: 'border-sage/20', icon: 'text-sage', accent: 'bg-sage' },
  terracotta: { bg: 'bg-[#FDF0E6]', border: 'border-terracotta/20', icon: 'text-terracotta', accent: 'bg-terracotta' },
  'dusty-rose': { bg: 'bg-dusty-rose-light', border: 'border-dusty-rose/20', icon: 'text-dusty-rose', accent: 'bg-dusty-rose' },
  rust: { bg: 'bg-[#F5ECE3]', border: 'border-rust/20', icon: 'text-rust', accent: 'bg-rust' },
}

interface Props {
  id: string
  label: string
  weeks: string
  color: string
  icon: string
  description: string
  locale?: string
}

export default function StageCard({ label, weeks, color, icon, description, locale = 'zh' }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }, [])

  const IconComponent = iconMap[icon]
  const colors = colorMap[color] ?? colorMap.sage
  const weekLabel = locale === 'en' ? `Week ${weeks}` : `第${weeks}周`

  return (
    <div
      ref={cardRef}
      className={`relative ${colors.bg} rounded-xl p-6 border ${colors.border} transition-all duration-500 ease-out cursor-default overflow-hidden group`}
      style={{ willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accent line at top */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex items-center gap-3 mb-4">
        <div className={`icon-draw ${colors.icon}`}>
          {IconComponent && <IconComponent size={22} strokeWidth={1.8} />}
        </div>
        <div>
          <h3 className="font-serif font-bold text-charcoal text-lg">{label}</h3>
          <p className="text-[11px] font-mono text-warm-gray tracking-wide">{weekLabel}</p>
        </div>
      </div>
      <p className="text-sm text-charcoal-light leading-relaxed">{description}</p>
    </div>
  )
}
