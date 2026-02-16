export interface Week {
  number: number
  title: string
  stage: string
  stageLabel: string
  goal: string
  project: string
  challenges: string[]
  milestones: string[]
}

export const stages = [
  { id: 'observer', label: '观察者', weeks: '1-3', color: 'sage', icon: '👁️', description: '建立基本认知，理解互联网和软件是什么' },
  { id: 'practitioner', label: '实践者', weeks: '4-6', color: 'terracotta', icon: '🔨', description: '开始动手做项目，用 AI 构建真实产品' },
  { id: 'critic', label: '评论家', weeks: '7-9', color: 'dusty-rose', icon: '🔍', description: '能判断方案好坏，能写出好的规格说明' },
  { id: 'creator', label: '创造者', weeks: '10-12', color: 'rust', icon: '🚀', description: '能独立设计方案，编排 AI 完成复杂任务' },
] as const

export const weeks: Week[] = [
  {
    number: 1,
    title: '认识软件世界',
    stage: 'observer',
    stageLabel: '观察者',
    goal: '理解互联网如何工作，安装 AI 编码工具，完成第一次部署',
    project: 'P1：数字名片（第一部分）',
    challenges: ['B1 5秒测试', 'B10 模糊测试', 'B15 色彩心理学解码'],
    milestones: ['个人页面已在互联网上可访问', '能解释浏览器输入网址后发生了什么', '做了至少2个品味挑战', '能区分前端和后端'],
  },
  {
    number: 2,
    title: '理解数据和用户',
    stage: 'observer',
    stageLabel: '观察者',
    goal: '理解数据库、CRUD、客户端 vs 服务端',
    project: 'P1 完善 + P2：灵感捕手（开始规划）',
    challenges: ['B2 空状态审计', 'A5 数据库设计挑战', 'B3 摩擦日记', 'B16 字体配对品鉴'],
    milestones: ['个人网站有自定义域名', '能解释数据库和 CRUD', '为灵感捕手画出数据流草图', '写了第一个 CLAUDE.md'],
  },
  {
    number: 3,
    title: '安全意识和提示工程入门',
    stage: 'observer',
    stageLabel: '观察者',
    goal: '理解安全基础，学会写好的提示',
    project: 'P2：灵感捕手（构建）',
    challenges: ['D1 好提示 vs 坏提示', 'C3 泄露侦探', 'C7 HTTPS 侦探', 'D3 上下文工程挑战'],
    milestones: ['灵感捕手可以保存和显示书签', '环境变量已正确配置', '能解释为什么不能硬编码 API 密钥', '重写了至少3个差提示'],
  },
  {
    number: 4,
    title: '输入验证和表单设计',
    stage: 'practitioner',
    stageLabel: '实践者',
    goal: '掌握输入验证，构建互动表单系统',
    project: 'P3：问卷星球',
    challenges: ['D2 CLAUDE.md 工匠', 'C8 输入验证沙盒', 'A6 技术选型辩论赛', 'B4 错误状态检验'],
    milestones: ['问卷星球基本功能可用', '所有输入都有验证', '写了第一个 SPEC.md', '理解 zod 或类似验证库'],
  },
  {
    number: 5,
    title: '认证和社区功能',
    stage: 'practitioner',
    stageLabel: '实践者',
    goal: '实现用户认证，构建社区平台',
    project: 'P4：圈子',
    challenges: ['C9 OAuth 流程追踪', 'C5 认证审计', 'B5 竞品拆解', 'A3 事后诸葛亮'],
    milestones: ['圈子有完整的注册/登录流程', '使用 Supabase Auth', '实现了基本的权限控制', '理解 JWT 和 Session 的区别'],
  },
  {
    number: 6,
    title: '支付和商业模型',
    stage: 'practitioner',
    stageLabel: '实践者',
    goal: '集成支付系统，理解商业模型',
    project: 'P5：微店',
    challenges: ['E1 成本直觉校准', 'E5 免费层设计', 'A10 性能审计', 'E8 定价心理学'],
    milestones: ['微店可以展示和购买商品', '集成了 Stripe 测试模式', '理解了支付流程的安全要求', '做了成本估算'],
  },
  {
    number: 7,
    title: 'AI 集成和提示工程进阶',
    stage: 'critic',
    stageLabel: '评论家',
    goal: '构建 AI 驱动的应用，精通提示工程',
    project: 'P6：AI 伙伴',
    challenges: ['I1 幻觉侦探', 'D6 少样本学习', 'D8 防御性提示', 'I2 模型选择', 'D10 链式思维'],
    milestones: ['AI 伙伴能进行有意义的对话', '实现了流式响应', '处理了 AI 幻觉问题', '优化了提示获得更好的响应'],
  },
  {
    number: 8,
    title: '代码审查和安全审计',
    stage: 'critic',
    stageLabel: '评论家',
    goal: '建立代码审查能力，能发现安全问题',
    project: '回顾和改进 P1-P6',
    challenges: ['C2 注入猎手', 'F1 Bug 猎手', 'F2 重构前后', 'C1 威胁建模', 'F6 依赖审计'],
    milestones: ['在已有代码中发现至少3个安全问题', '重构了一个之前写的项目', '能读懂 AI 生成的代码', '完成了依赖审计'],
  },
  {
    number: 9,
    title: '架构设计和规格驱动开发',
    stage: 'critic',
    stageLabel: '评论家',
    goal: '学会设计系统架构，写规格文档',
    project: 'P7 规划阶段',
    challenges: ['A1 餐巾纸测试', 'A2 过度设计猎手', 'E2 规模心算', 'A13 微服务 vs 单体', 'E14 技术债务'],
    milestones: ['为 P7 写了完整的 SPEC.md', '画出了系统架构图', '能判断架构是否过度设计', '理解了技术债务的概念'],
  },
  {
    number: 10,
    title: '运维和可靠性',
    stage: 'creator',
    stageLabel: '创造者',
    goal: '理解生产环境运维，构建可靠系统',
    project: 'P7：全栈工厂（构建）',
    challenges: ['K1 日志侦探', 'K2 监控仪表板', 'K5 灾难恢复', 'I9 成本优化', 'K8 事故复盘'],
    milestones: ['P7 有基本的日志和监控', '设置了错误告警', '写了一份运维清单', '理解了 SLA 和 SLO'],
  },
  {
    number: 11,
    title: '营销和增长',
    stage: 'creator',
    stageLabel: '创造者',
    goal: '学会营销产品，理解增长策略',
    project: 'P7 营销和发布',
    challenges: ['G1 首页文案评审', 'G2 竞品定位分析', 'G3 用户画像', 'G4 增长实验设计', 'J1 技术文档评审'],
    milestones: ['为 P7 写了营销文案', '分析了竞品定位', '做了用户画像', '设计了至少一个增长实验'],
  },
  {
    number: 12,
    title: '毕业：成为编排者',
    stage: 'creator',
    stageLabel: '创造者',
    goal: '整合所有技能，独立完成复杂项目',
    project: 'P7 完善和毕业',
    challenges: ['A15 架构决策记录', 'E4 商业模型画布', 'D14 多代理编排', 'I7 AI 产品设计', 'B18 设计系统评审'],
    milestones: ['P7 已部署并可供真实用户使用', '完成了所有项目的作品集', '能用 AI 独立构建新项目', '完成了至少100个品味挑战'],
  },
]
