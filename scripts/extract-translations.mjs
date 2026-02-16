import fs from 'node:fs'
import path from 'node:path'

const subagentDir = '/Users/parafee41/.claude/projects/-Users-parafee41-Desktop-vibecoder-app/3575969f-a2ce-4091-95ac-ed5828e3fae9/subagents'

// Agent IDs and their parts
const agents = [
  { id: 'a920b65', part: 1 },  // Categories A, B
  { id: 'a61c10a', part: 2 },  // Categories C, D, E
  { id: 'a5c9117', part: 3 },  // Categories F, G, H, I
  { id: 'a713677', part: 4 },  // Categories J, K, L
]

// Build an English header
const header = `# 2026 Vibe Coder Taste Training Collection: 153 Challenges

> **Taste isn't a talent — it's trained.**
>
> This document contains **153 detailed taste-building challenges** across 12 dimensions.
> Each challenge is designed for 30-90 minutes and can be repeated.
> The goal is to build the intuition of "something feels off" — judge solutions without writing code.
>
> **Design Date**: February 2026
> **Based on**: Deep research by 4 parallel research agents + synthesis of 40+ publications
> **Note**: Service pricing mentioned in this document is as of early 2026. Please check official platform websites for current pricing.

---

## Table of Contents

| Category | Count | IDs |
|------|---------|------|
| 1. Architecture Intuition | 15 | A1-A15 |
| 2. UX/Product Taste | 18 | B1-B18 |
| 3. Security Instinct | 12 | C1-C12 |
| 4. Prompt Engineering | 15 | D1-D15 |
| 5. Cost & Business | 15 | E1-E15 |
| 6. Code Review | 10 | F1-F10 |
| 7. Marketing & Growth | 15 | G1-G15 |
| 8. Data & Analytics | 10 | H1-H10 |
| 9. AI/LLM Integration | 15 | I1-I15 |
| 10. Communication & Docs | 10 | J1-J10 |
| 11. Ops & Reliability | 10 | K1-K10 |
| 12. Performance Optimization | 8 | L1-L8 |
| **Total** | **153** | |
`

let finalContent = header

for (const agent of agents) {
  const jsonlFile = path.join(subagentDir, `agent-${agent.id}.jsonl`)
  const lines = fs.readFileSync(jsonlFile, 'utf-8').split('\n')

  let bestContent = ''
  let bestLen = 0

  for (const line of lines) {
    if (!line.trim()) continue
    try {
      const obj = JSON.parse(line)
      const msg = obj.message || {}
      const content = msg.content
      if (!Array.isArray(content)) continue

      for (const block of content) {
        if (block?.type === 'tool_use' && block?.name === 'Write') {
          const c = block.input?.content || ''
          if (c.includes('# Category') && c.length > bestLen) {
            bestContent = c
            bestLen = c.length
          }
        }
      }
    } catch {
      // skip invalid JSON
    }
  }

  if (bestContent) {
    finalContent += '\n---\n\n' + bestContent.trim() + '\n'
    console.log(`Part ${agent.part}: extracted ${bestContent.split('\n').length} lines (${bestLen} chars)`)
  } else {
    console.error(`Part ${agent.part}: COULD NOT EXTRACT CONTENT`)
  }
}

// Write the final file
fs.writeFileSync('src/data/challenges-raw.en.md', finalContent, 'utf-8')
console.log(`\nTotal lines: ${finalContent.split('\n').length}`)
console.log('Written to src/data/challenges-raw.en.md')
