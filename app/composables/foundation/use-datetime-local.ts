import { parse, format } from '@formkit/tempo'

export const useDatetimeLocal = () => {
  const { locale } = useLocale()

  const parseDT = (datetime: string, format: string): Date => {
    return parse(datetime, format, locale.value)
  }

  const toISO8601 = (datetime: string): string => {
    return format(parseDT(datetime, 'YYYY/MM/DD HH:mm'), 'YYYY-MM-DDTHH:mm', locale.value)
  }

  const fromISO8601 = (datetime: string): string => {
    return format(parseDT(datetime, 'YYYY-MM-DDTHH:mm'), 'YYYY/MM/DD HH:mm', locale.value)
  }

  const upDTL = (datetime: string | null): string | null => {
    return datetime ? toISO8601(datetime) : null
  }

  const downDTL = (datetime: string | null): string => {
    return datetime ? fromISO8601(datetime) : ''
  }

  const formatHTML = (datetime: string | null): string => {
    return datetime
      ? format(
          parse(datetime, 'YYYY/MM/DD HH:mm', locale.value),
          'YYYY/MM/DD (ddd) HH:mm',
          locale.value,
        )
      : ''
  }

  return { upDTL, downDTL, toISO8601, formatHTML }
}
