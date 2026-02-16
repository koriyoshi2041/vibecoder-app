export interface Project {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  stage: string
  weeks: string
  skills: string[]
  deliverables: string[]
}

export const projects: Project[] = [
  {
    id: 'P1', number: 1,
    title: '数字名片',
    subtitle: '个人品牌网站',
    description: '你的第一个项目——用 AI 生成个人网站并部署到互联网上。学会基本的前端概念、Git 操作和部署流程。',
    stage: 'observer',
    weeks: '第1-2周',
    skills: ['HTML/CSS 基础', 'Git & GitHub', 'Vercel 部署', '响应式设计'],
    deliverables: ['在线可访问的个人网站', '自定义域名', 'GitHub 仓库'],
  },
  {
    id: 'P2', number: 2,
    title: '灵感捕手',
    subtitle: '智能书签管理器',
    description: '构建一个能保存、分类和搜索书签的应用。学会数据库操作、CRUD 和基本的后端概念。',
    stage: 'observer',
    weeks: '第2-3周',
    skills: ['Supabase 数据库', 'CRUD 操作', '环境变量', 'CLAUDE.md 编写'],
    deliverables: ['可保存书签的应用', '分类和搜索功能', '第一个 CLAUDE.md'],
  },
  {
    id: 'P3', number: 3,
    title: '问卷星球',
    subtitle: '互动表单系统',
    description: '构建一个可以创建和分享问卷的系统。学会输入验证、复杂表单处理和数据可视化。',
    stage: 'practitioner',
    weeks: '第4周',
    skills: ['输入验证 (Zod)', '复杂状态管理', 'SPEC.md 编写', '数据可视化'],
    deliverables: ['可创建问卷的系统', '分享链接', '统计面板'],
  },
  {
    id: 'P4', number: 4,
    title: '圈子',
    subtitle: '社区平台',
    description: '构建一个带认证的社区平台。学会用户认证、权限控制和社交功能。',
    stage: 'practitioner',
    weeks: '第5周',
    skills: ['Supabase Auth', 'JWT/Session', '权限控制', '实时功能'],
    deliverables: ['注册/登录系统', '帖子和评论', '基本权限控制'],
  },
  {
    id: 'P5', number: 5,
    title: '微店',
    subtitle: '电商产品',
    description: '构建一个集成支付的小型电商。学会支付流程、安全处理和商业模型。',
    stage: 'practitioner',
    weeks: '第6周',
    skills: ['Stripe 支付', '购物车逻辑', '订单管理', '成本估算'],
    deliverables: ['商品展示和购买', 'Stripe 测试支付', '订单追踪'],
  },
  {
    id: 'P6', number: 6,
    title: 'AI 伙伴',
    subtitle: 'AI 驱动的应用',
    description: '构建一个集成 AI 的应用。学会 API 调用、流式响应、提示工程和幻觉处理。',
    stage: 'critic',
    weeks: '第7周',
    skills: ['Claude/OpenAI API', '流式响应', '提示工程', '幻觉处理'],
    deliverables: ['AI 对话功能', '流式回复', '错误处理'],
  },
  {
    id: 'P7', number: 7,
    title: '全栈工厂',
    subtitle: '生产级系统',
    description: '从规格文档开始，独立构建一个生产级应用。整合所有技能：架构设计、安全、运维、营销。',
    stage: 'creator',
    weeks: '第9-12周',
    skills: ['架构设计', '安全审计', '运维监控', '营销发布'],
    deliverables: ['完整 SPEC.md', '生产级部署', '监控告警', '营销页面'],
  },
]
