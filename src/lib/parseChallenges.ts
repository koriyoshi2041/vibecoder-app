import fs from 'node:fs'
import path from 'node:path'

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

export function parseAllChallenges(): ParsedChallenge[] {
  const filePath = path.join(process.cwd(), 'src/data/challenges-raw.md')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const challengeBlocks = raw.split(/\n---\n/).filter(block =>
    /^##\s+[A-L]\d+/.test(block.trim())
  )

  return challengeBlocks.map(block => {
    const lines = block.trim().split('\n')

    const headerMatch = lines[0].match(/^##\s+([A-L]\d+)[：:]\s*(.+)/)
    if (!headerMatch) return null

    const id = headerMatch[1]
    const title = headerMatch[2]

    const metaLine = lines.find(l => l.startsWith('**时间**'))
    const time = metaLine?.match(/\*\*时间\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ?? ''
    const difficulty = metaLine?.match(/\*\*难度\*\*[：:]\s*(.+?)\s*\|/)?.[1]?.trim() ?? ''
    const repeatable = metaLine?.match(/\*\*可重复\*\*[：:]\s*(.+)/)?.[1]?.trim() ?? ''

    const criteria: string[] = []
    const criteriaRegex = /^- \[ \]\s+(.+)/gm
    let match
    while ((match = criteriaRegex.exec(block)) !== null) {
      criteria.push(match[1])
    }

    const learningsMatch = block.match(/\*\*你会学到\*\*[：:]\s*(.+)/)
    const learnings = learningsMatch ? learningsMatch[1] : ''

    const contentStart = lines.findIndex(l => l.startsWith('**格式**') || l.startsWith('**场景') || l.startsWith('**练习') || l.startsWith('**操作'))
    const contentEnd = lines.findIndex(l => l.startsWith('**你会学到'))
    const content = contentStart > 0
      ? lines.slice(contentStart, contentEnd > contentStart ? contentEnd : undefined).join('\n')
      : lines.slice(2).join('\n')

    return { id, title, time, difficulty, repeatable, content, criteria, learnings }
  }).filter((c): c is ParsedChallenge => c !== null)
}

export function getChallengeById(id: string): ParsedChallenge | undefined {
  return parseAllChallenges().find(c => c.id === id)
}
