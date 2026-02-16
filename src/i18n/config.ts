export type Locale = 'zh' | 'en'

export const defaultLocale: Locale = 'zh'
export const locales: Locale[] = ['zh', 'en']

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'EN',
}

export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments[0] === 'en') return 'en'
  return 'zh'
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/en/, '') || '/'
  if (locale === 'zh') return cleanPath
  return `/en${cleanPath === '/' ? '' : cleanPath}`
}
