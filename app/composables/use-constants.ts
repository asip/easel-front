export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const backendOriginURL = computed<string | undefined>(
    () => {
      if (import.meta.client) {
        return runtimeConfig.public.backendOriginURL
      } else if (import.meta.server) {
        return runtimeConfig.backendOriginURL
      }
    }
  )

  const backendApiURL = computed<string>(
    () => `${backendOriginURL.value}/api/v1`
  )

  const googleClientID: string = runtimeConfig.public.googleClientId

  const commonHeaders: Ref<Record<string, string>> = computed(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client
  }))

  return { backendApiURL, googleClientID, commonHeaders }
}
