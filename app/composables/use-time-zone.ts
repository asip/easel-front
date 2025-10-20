import { parse, format, tzDate } from '@formkit/tempo'

export const useTimeZone = () => {
  const runtimeConfig = useRuntimeConfig()
  const { locale } = useLocale()
  const { toISO8601, formatHTML } = useDatetimeLocal()

  const timeZone = computed(
    () => ({
      client: Intl.DateTimeFormat().resolvedOptions().timeZone,
      server: runtimeConfig.public.timeZone
    })
  )

  const tzOptions = computed(() => Intl.supportedValuesOf('timeZone').map(
    e => ({ text: e , value: e })
  ))

  const tzServerDate = (datetime: string) => {
    return tzDate(toISO8601(datetime), timeZone.value.server)
  }

  const tzClientDate = (datetime: string) => {
    return tzDate(toISO8601(datetime), timeZone.value.client)
  }

  const upTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ? (datetime ?? '') : (datetime ? format({
      date: tzServerDate(datetime),
      format: 'YYYY/MM/DD HH:mm',
      locale: locale.value,
      tz: timeZone.value.client
    }) : '')
  }

  const downTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ? (datetime ?? '') : (datetime ? format({
      date: tzClientDate(datetime),
      format: 'YYYY/MM/DD HH:mm',
      locale: locale.value,
      tz: timeZone.value.server
    }) : '')
  }

  const formatHtmlTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ?  formatHTML(datetime) : (datetime ? format({
      date: tzServerDate(datetime),
      format: 'YYYY/MM/DD (ddd) HH:mm',
      locale: locale.value,
      tz: timeZone.value.client
    }) : '')
  }

  return { timeZone, tzOptions, upTZ, downTZ, formatHtmlTZ }
}

// export type UseTimeZoneType = ReturnType<typeof useTimeZone>
