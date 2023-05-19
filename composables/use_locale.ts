import { useBrowserLocale } from '#i18n'

export const useLocale = () => {
  const { locale } = useI18n()
  const autoDetect = () => {
    const browserLocale: string | null = useBrowserLocale()
    // console.log(browserLocale)
    // console.log(locales.value)

    // @ts-ignore
    locale.value = browserLocale
  }

  return { locale, autoDetect }
}
