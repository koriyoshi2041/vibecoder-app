import type { Locale } from './config'

const ui = {
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.path': '学习路径',
    'nav.challenges': '品味挑战',
    'nav.projects': '项目',

    // Home page
    'home.subtitle': '2026 VIBE CODER 进阶之路',
    'home.title': '从零到编排者',
    'home.desc': '你不需要学会写代码，你需要学会',
    'home.desc.bold': '指挥 AI 写代码',
    'home.meta': '12周结构化学习 · 7个递进式项目 · 153个品味挑战 · 从观察者到创造者',
    'home.progress': '你的进度',
    'home.stages': '四个阶段',
    'home.stats': '记住这些数字',
    'home.explore': '开始探索',
    'home.stat1.value': '45%',
    'home.stat1.desc': '的 AI 代码引入安全漏洞',
    'home.stat1.source': 'Veracode 2025 — 永远验证',
    'home.stat2.value': '80%',
    'home.stat2.desc': '是 AI 能轻松完成的',
    'home.stat2.source': '剩下的20%是你的价值',
    'home.stat3.value': '19%',
    'home.stat3.desc': '更慢——如果不理解代码',
    'home.stat3.source': '盲目使用 AI 反而拖慢进度',
    'home.link.path.label': '12 WEEKS',
    'home.link.path.title': '学习路径',
    'home.link.path.desc': '结构化的12周学习计划，从认知到独立创造',
    'home.link.challenges.label': '153 CHALLENGES',
    'home.link.challenges.title': '品味挑战',
    'home.link.challenges.desc': '12个维度的品味训练，不写代码也能练判断力',
    'home.link.projects.label': '7 PROJECTS',
    'home.link.projects.title': '主线项目',
    'home.link.projects.desc': '递进式实战项目，从名片到生产级系统',
    'home.stageWeekPrefix': '第',
    'home.stageWeekSuffix': '周',

    // Challenges page
    'challenges.label': 'TASTE CHALLENGES',
    'challenges.title': '153 个品味挑战',
    'challenges.subtitle': '品味不是天赋，是训练出来的。',
    'challenges.meta': '12个维度 · 每个挑战 30-90 分钟 · 可反复做 · 点击卡片查看详情',
    'challenges.all': '全部',
    'challenges.completed': '完成',
    'challenges.view': '查看 →',
    'challenges.markComplete': '标记完成',
    'challenges.unmarkComplete': '取消完成',

    // Challenge Detail
    'challenge.breadcrumb': '品味挑战',
    'challenge.criteria': '评判标准（自测）',
    'challenge.learnings': '你会学到',
    'challenge.notes': '我的笔记',
    'challenge.notesPlaceholder': '记录你的思考、发现和反思...',
    'challenge.saveNote': '保存笔记',
    'challenge.saved': '已保存',
    'challenge.complete': '标记为完成 (+20 XP)',
    'challenge.completed': '已完成',
    'challenge.completedToggle': '✓ 已完成此挑战 · 点击取消',
    'challenge.prev': '上一个',
    'challenge.next': '下一个',
    'challenge.backToList': '返回列表',

    // Path page
    'path.label': 'LEARNING PATH',
    'path.title': '12周学习路径',
    'path.subtitle': '每周 5-8 小时 · 从观察者到创造者',
    'path.weekPrefix': '第',
    'path.weekSuffix': '周',
    'path.project': '项目',
    'path.challenges': '品味挑战',
    'path.milestones': '里程碑',

    // Projects page
    'projects.label': 'PROJECTS',
    'projects.title': '7 个主线项目',
    'projects.subtitle': '从个人名片到生产级系统，每个项目都是真实的软件产品。',
    'projects.skills': '技能要点',
    'projects.deliverables': '交付物',
    'projects.capability': '四层能力模型',
    'projects.l4.name': '编排层',
    'projects.l4.desc': '多代理协作、规格驱动开发（SDD）',
    'projects.l3.name': '治理层',
    'projects.l3.desc': '安全审计、代码审查、成本管理',
    'projects.l2.name': '通信层',
    'projects.l2.desc': 'CLAUDE.md、SPEC.md、提示工程',
    'projects.l1.name': '基础层',
    'projects.l1.desc': '互联网原理、数据库、部署',

    // Progress Dashboard
    'progress.streak': '连续学习',
    'progress.streakUnit': '天',
    'progress.currentWeek': '当前周次',
    'progress.currentWeekPrefix': '第',
    'progress.currentWeekSuffix': '周',
    'progress.completedChallenges': '已完成挑战',
    'progress.totalXp': '总经验值',
    'progress.viewPath': '查看学习路径 →',
    'progress.browseChallenges': '浏览品味挑战',
    'progress.weekLabel': '周',

    // Stages
    'stage.observer': '观察者',
    'stage.practitioner': '实践者',
    'stage.critic': '评论家',
    'stage.creator': '创造者',

    // Difficulty
    'difficulty.beginner': '入门',
    'difficulty.intermediate': '中级',
    'difficulty.advanced': '高级',

    // Layout
    'layout.title': 'VibeCoder Learn',
    'layout.description': '从零到编排者：AI 时代的软件构建课程',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.path': 'Path',
    'nav.challenges': 'Challenges',
    'nav.projects': 'Projects',

    // Home page
    'home.subtitle': '2026 VIBE CODER JOURNEY',
    'home.title': 'From Zero to Orchestrator',
    'home.desc': "You don't need to learn to write code, you need to learn to",
    'home.desc.bold': 'direct AI to write code',
    'home.meta': '12-week structured learning · 7 progressive projects · 153 taste challenges · From observer to creator',
    'home.progress': 'Your Progress',
    'home.stages': 'Four Stages',
    'home.stats': 'Remember These Numbers',
    'home.explore': 'Start Exploring',
    'home.stat1.value': '45%',
    'home.stat1.desc': 'of AI code introduces security vulnerabilities',
    'home.stat1.source': 'Veracode 2025 — Always verify',
    'home.stat2.value': '80%',
    'home.stat2.desc': 'can be easily done by AI',
    'home.stat2.source': 'The remaining 20% is your value',
    'home.stat3.value': '19%',
    'home.stat3.desc': "slower — if you don't understand the code",
    'home.stat3.source': 'Blindly using AI actually slows you down',
    'home.link.path.label': '12 WEEKS',
    'home.link.path.title': 'Learning Path',
    'home.link.path.desc': 'A structured 12-week plan, from awareness to independent creation',
    'home.link.challenges.label': '153 CHALLENGES',
    'home.link.challenges.title': 'Taste Challenges',
    'home.link.challenges.desc': '12 dimensions of taste training — sharpen judgment without writing code',
    'home.link.projects.label': '7 PROJECTS',
    'home.link.projects.title': 'Main Projects',
    'home.link.projects.desc': 'Progressive hands-on projects, from business cards to production systems',
    'home.stageWeekPrefix': 'Week ',
    'home.stageWeekSuffix': '',

    // Challenges page
    'challenges.label': 'TASTE CHALLENGES',
    'challenges.title': '153 Taste Challenges',
    'challenges.subtitle': "Taste isn't a talent — it's trained.",
    'challenges.meta': '12 dimensions · 30-90 min each · Repeatable · Click cards for details',
    'challenges.all': 'All',
    'challenges.completed': 'Done',
    'challenges.view': 'View →',
    'challenges.markComplete': 'Mark complete',
    'challenges.unmarkComplete': 'Unmark',

    // Challenge Detail
    'challenge.breadcrumb': 'Challenges',
    'challenge.criteria': 'Self-Assessment Criteria',
    'challenge.learnings': 'What You Will Learn',
    'challenge.notes': 'My Notes',
    'challenge.notesPlaceholder': 'Record your thoughts, discoveries, and reflections...',
    'challenge.saveNote': 'Save Note',
    'challenge.saved': 'Saved',
    'challenge.complete': 'Mark as Complete (+20 XP)',
    'challenge.completed': 'Completed',
    'challenge.completedToggle': '✓ Challenge completed · Click to undo',
    'challenge.prev': 'Previous',
    'challenge.next': 'Next',
    'challenge.backToList': 'Back to list',

    // Path page
    'path.label': 'LEARNING PATH',
    'path.title': '12-Week Learning Path',
    'path.subtitle': '5-8 hours per week · From observer to creator',
    'path.weekPrefix': 'Week ',
    'path.weekSuffix': '',
    'path.project': 'Project',
    'path.challenges': 'Taste Challenges',
    'path.milestones': 'Milestones',

    // Projects page
    'projects.label': 'PROJECTS',
    'projects.title': '7 Main Projects',
    'projects.subtitle': 'From personal business cards to production-grade systems — every project is a real software product.',
    'projects.skills': 'Key Skills',
    'projects.deliverables': 'Deliverables',
    'projects.capability': 'Four-Layer Capability Model',
    'projects.l4.name': 'Orchestration',
    'projects.l4.desc': 'Multi-agent collaboration, Spec-Driven Development (SDD)',
    'projects.l3.name': 'Governance',
    'projects.l3.desc': 'Security audits, code review, cost management',
    'projects.l2.name': 'Communication',
    'projects.l2.desc': 'CLAUDE.md, SPEC.md, prompt engineering',
    'projects.l1.name': 'Foundation',
    'projects.l1.desc': 'Internet fundamentals, databases, deployment',

    // Progress Dashboard
    'progress.streak': 'Streak',
    'progress.streakUnit': 'd',
    'progress.currentWeek': 'Current Week',
    'progress.currentWeekPrefix': 'Week ',
    'progress.currentWeekSuffix': '',
    'progress.completedChallenges': 'Completed',
    'progress.totalXp': 'Total XP',
    'progress.viewPath': 'View Learning Path →',
    'progress.browseChallenges': 'Browse Challenges',
    'progress.weekLabel': 'Week',

    // Stages
    'stage.observer': 'Observer',
    'stage.practitioner': 'Practitioner',
    'stage.critic': 'Critic',
    'stage.creator': 'Creator',

    // Difficulty
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',

    // Layout
    'layout.title': 'VibeCoder Learn',
    'layout.description': 'From Zero to Orchestrator: Software Building for the AI Era',
  },
} as const

export type UIKey = keyof typeof ui.zh

export function t(key: UIKey, locale: Locale): string {
  return ui[locale][key] ?? ui.zh[key] ?? key
}
