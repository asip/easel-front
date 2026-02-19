import { format, tzDate } from '@formkit/tempo'

interface TimeZone {
  client: string
  server: string
}

interface TZOptions {
  text: string
  value: string
}

export const useTimeZone = () => {
  const runtimeConfig = useRuntimeConfig()
  const { locale } = useLocale()
  const { toISO8601, formatHTML } = useDatetimeLocal()

  const timeZone = computed<TimeZone>(() => ({
    client: Intl.DateTimeFormat().resolvedOptions().timeZone,
    server: runtimeConfig.public.timeZone,
  }))

  const tzOptions = computed<TZOptions[]>(() =>
    Intl.supportedValuesOf('timeZone').map((e) => ({ text: e, value: e })),
  )

  const tzServerDate = (datetime: string): Date => {
    return tzDate(toISO8601(datetime), timeZone.value.server)
  }

  const tzClientDate = (datetime: string): Date => {
    return tzDate(toISO8601(datetime), timeZone.value.client)
  }

  const upTZ = (datetime: string | null): string => {
    return timeZone.value.client === timeZone.value.server
      ? (datetime ?? '')
      : datetime
        ? format({
            date: tzServerDate(datetime),
            format: 'YYYY/MM/DD HH:mm',
            locale: locale.value,
            tz: timeZone.value.client,
          })
        : ''
  }

  const downTZ = (datetime: string | null): string => {
    return timeZone.value.client === timeZone.value.server
      ? (datetime ?? '')
      : datetime
        ? format({
            date: tzClientDate(datetime),
            format: 'YYYY/MM/DD HH:mm',
            locale: locale.value,
            tz: timeZone.value.server,
          })
        : ''
  }

  const formatHtmlTZ = (datetime: string | null, fmt: string): string => {
    return timeZone.value.client === timeZone.value.server
      ? formatHTML(datetime, fmt)
      : datetime
        ? format({
            date: tzServerDate(datetime),
            format: fmt,
            locale: locale.value,
            tz: timeZone.value.client,
          })
        : ''
  }

  return { timeZone, tzOptions, upTZ, downTZ, formatHtmlTZ }
}

// export type UseTimeZoneType = ReturnType<typeof useTimeZone>
