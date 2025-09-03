import { useBrowserLocale } from '#i18n'

export const useLocale = () => {
  const { $i18n } = useNuxtApp()
  const { locale } = $i18n
  const autoDetect = () => {
    const browserLocale: string | null = useBrowserLocale()
    // console.log(browserLocale)
    // console.log(locales.value)

    locale.value = (($i18n.availableLocales as string[]).includes(browserLocale ?? '') ? browserLocale : 'en') as 'en' | 'ja'
  }

  return { locale, autoDetect }
}
