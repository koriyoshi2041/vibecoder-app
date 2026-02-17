import { useState, useEffect, useRef } from 'react'

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  'dusty-rose': { bg: 'bg-dusty-rose-light', border: 'border-dusty-rose/20', text: 'text-dusty-rose' },
  sage: { bg: 'bg-sage-light', border: 'border-sage/20', text: 'text-sage' },
  bronze: { bg: 'bg-[#F5EFE3]', border: 'border-cream/40', text: 'text-bronze' },
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
    <div ref={ref} className={`card-elevated ${colors.bg} rounded-lg p-6 border ${colors.border}`}>
      <p className={`text-4xl font-bold font-mono ${colors.text} mb-2`}>
        {prefix}{current}{suffix}
      </p>
      <p className="text-sm text-charcoal-light leading-relaxed">
        {label}
        <br />
        <span className="text-xs text-warm-gray">{sublabel}</span>
      </p>
    </div>
  )
}
