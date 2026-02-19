import { useBrowserLocale } from '#i18n'

export const useLocale = () => {
  const { $i18n } = useNuxtApp()
  const { locale } = $i18n
  const autoDetect = (): void => {
    const browserLocale: string | null = useBrowserLocale()
    // console.log(browserLocale)
    // console.log(locales.value)

    type AvailableLocales = (typeof $i18n.availableLocales)[number]

    locale.value = (
      ($i18n.availableLocales as string[]).includes(browserLocale ?? '') ? browserLocale : 'en'
    ) as AvailableLocales
  }

  return { locale, autoDetect }
}
