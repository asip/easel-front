export const useHttpHeaders = () => {
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const commonHeaders: Ref<Record<string, string>> = computed(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client,
  }))

  return { commonHeaders }
}
