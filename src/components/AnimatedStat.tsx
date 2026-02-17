import { useState, useEffect, useRef } from 'react'

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  'dusty-rose': { bg: 'bg-dusty-rose-light', border: 'border-dusty-rose/15', text: 'text-dusty-rose', accent: 'bg-dusty-rose' },
  sage: { bg: 'bg-sage-light', border: 'border-sage/15', text: 'text-sage', accent: 'bg-sage' },
  bronze: { bg: 'bg-[#F5EFE3]', border: 'border-cream/30', text: 'text-bronze', accent: 'bg-bronze' },
}

interface Props {
  value: number
  suffix?: string
  prefix?: string
  color: string
  label: string
  sublabel: string
}

function useCountUp(end: number, duration = 2000) {
  const [current, setCurrent] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

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
  }, [started, end, duration])

  return { current, ref }
}

export default function AnimatedStat({ value, suffix = '', prefix = '', color, label, sublabel }: Props) {
  const colors = colorMap[color] ?? colorMap.sage
  const { current, ref } = useCountUp(value)

  return (
    <div
      ref={ref}
      className={`relative ${colors.bg} rounded-xl p-7 sm:p-8 border ${colors.border} overflow-hidden group hover:shadow-lg transition-shadow duration-500`}
    >
      {/* Accent dot */}
      <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${colors.accent} opacity-40`} />

      <p className={`text-5xl sm:text-6xl font-bold font-mono ${colors.text} mb-3 stat-number`}>
        {prefix}{current}{suffix}
      </p>
      <p className="text-sm text-charcoal-light leading-relaxed">
        {label}
      </p>
      <p className="text-xs text-warm-gray mt-1.5">{sublabel}</p>
    </div>
  )
}
