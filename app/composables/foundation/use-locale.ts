import { useBrowserLocale } from '#i18n'

export const useLocale = () => {
  const { $i18n } = useNuxtApp()
  const { locale, availableLocales, fallbackLocale } = $i18n
  const autoDetect = (): void => {
    const browserLocale: string | null = useBrowserLocale()
    // console.log(browserLocale)
    // console.log(locales.value)

    type AvailableLocales = (typeof $i18n.availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(browserLocale ?? '')
        ? browserLocale
        : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, autoDetect }
}
