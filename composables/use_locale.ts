import {useBrowserLocale} from "#i18n";

export const useLocale = () => {
  const { locale, locales } = useI18n()
  const autoDetect = () => {
    const browserLocale: string | null = useBrowserLocale()
    //console.log(browserLocale)
    //console.log(locales.value)

    // @ts-ignore
    locale.value = (browserLocale && locales.value.includes(browserLocale) ? browserLocale : 'en')
  }

  return { locale, autoDetect }
}
