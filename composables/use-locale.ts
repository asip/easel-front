import { useBrowserLocale } from '#i18n'

export const useLocale = () => {
  const { locale } = useNuxtApp().$i18n
  const autoDetect = () => {
    const browserLocale: string | null = useBrowserLocale()
    // console.log(browserLocale)
    // console.log(locales.value)

    // @ts-expect-error
    locale.value = browserLocale
  }

  return { locale, autoDetect }
}
