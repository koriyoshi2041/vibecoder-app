import fs from 'node:fs'
import path from 'node:path'
import type { Locale } from '../i18n'

export interface ParsedChallenge {
  id: string
  title: string
  time: string
  difficulty: string
  repeatable: string
  content: string
  criteria: string[]
  learnings: string
}

export function parseAllChallenges(locale: Locale = 'zh'): ParsedChallenge[] {
  const filename = locale === 'en' ? 'challenges-raw.en.md' : 'challenges-raw.md'
  const filePath = path.join(process.cwd(), 'src/data', filename)
  // Fallback to Chinese if English file doesn't exist yet
  const fallbackPath = path.join(process.cwd(), 'src/data/challenges-raw.md')
  const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : fs.readFileSync(fallbackPath, 'utf-8')

  const challengeBlocks = raw.split(/\n---\n/).filter((block: string) =>
    /^##\s+[A-L]\d+/.test(block.trim())
  )

  return challengeBlocks.map((block: string) => {
    const lines: string[] = block.trim().split('\n')

    const headerMatch = lines[0].match(/^##\s+([A-L]\d+)[：:]\s*(.+)/)
    if (!headerMatch) return null

    const id = headerMatch[1]
    const title = headerMatch[2]

    // Support both Chinese and English field labels
    const metaLine = lines.find((l: string) => l.startsWith('**时间**') || l.startsWith('**Time**'))
    const time = (
      metaLine?.match(/\*\*时间\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ??
      metaLine?.match(/\*\*Time\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ?? ''
    )
    const difficulty = (
      metaLine?.match(/\*\*难度\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ??
      metaLine?.match(/\*\*Difficulty\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ?? ''
    )
    const repeatable = (
      metaLine?.match(/\*\*可重复\*\*[：:]\s*(.+)/)?.[1]?.trim() ??
      metaLine?.match(/\*\*Repeatable\*\*[：:]\s*(.+)/)?.[1]?.trim() ?? ''
    )

    const criteria: string[] = []
    const criteriaRegex = /^- \[ \]\s+(.+)/gm
    let match
    while ((match = criteriaRegex.exec(block)) !== null) {
      criteria.push(match[1])
    }

    const learningsMatch = block.match(/\*\*(你会学到|What You'll Learn)\*\*[：:]\s*(.+)/)
    const learnings = learningsMatch ? learningsMatch[2] : ''

    const contentStart = lines.findIndex((l: string) =>
      l.startsWith('**格式**') || l.startsWith('**场景') || l.startsWith('**练习') || l.startsWith('**操作') ||
      l.startsWith('**Format**') || l.startsWith('**Scenario') || l.startsWith('**Exercise') || l.startsWith('**Task')
    )
    const contentEnd = lines.findIndex((l: string) => l.startsWith('**你会学到') || l.startsWith("**What You'll Learn"))
    const content = contentStart > 0
      ? lines.slice(contentStart, contentEnd > contentStart ? contentEnd : undefined).join('\n')
      : lines.slice(2).join('\n')

    return { id, title, time, difficulty, repeatable, content, criteria, learnings }
  }).filter((c: ParsedChallenge | null): c is ParsedChallenge => c !== null)
}

export function getChallengeById(id: string, locale: Locale = 'zh'): ParsedChallenge | undefined {
  return parseAllChallenges(locale).find((c: ParsedChallenge) => c.id === id)
}
