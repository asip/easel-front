import { parse, format, tzDate } from '@formkit/tempo'

export const useTimeZone = () => {
  const runtimeConfig = useRuntimeConfig()
  const { locale } = useLocale()
  const { formatHTML } = useDatetimeLocalFormat()

  const timeZone = computed(
    () => ({
      client: Intl.DateTimeFormat().resolvedOptions().timeZone,
      server: runtimeConfig.public.timeZone
    })
  )

  const upISO8601 = (datetime: string) => {
    return format(parse(datetime, 'YYYY/MM/DD HH:mm', locale.value), 'YYYY-MM-DDTHH:mm', locale.value)
  }

  const upTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ? (datetime ?? '') : (datetime ? format({
      date: tzDate(upISO8601(datetime), timeZone.value.server),
      format: 'YYYY/MM/DD HH:mm',
      locale: locale.value,
      tz: timeZone.value.client
    }) : "")
  }

  const downTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ? (datetime ?? '') : (datetime ? format({
      date: tzDate(upISO8601(datetime), timeZone.value.client),
      format: 'YYYY/MM/DD HH:mm',
      locale: locale.value,
      tz: timeZone.value.server
    }) : '')
  }

  const formatTZ = (datetime: string | null) => {
    return (timeZone.value.client === timeZone.value.server) ?  formatHTML(datetime) : (datetime ? format({
      date: tzDate(upISO8601(datetime), timeZone.value.server),
      format: 'YYYY/MM/DD (ddd) HH:mm',
      locale: locale.value,
      tz: timeZone.value.client
    }) : '')
  }

  return { upTZ, downTZ, formatTZ }
}
