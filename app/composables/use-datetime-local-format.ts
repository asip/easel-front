import { parse, format } from '@formkit/tempo'

export const useDatetimeLocalFormat = () => {
  const { locale } = useLocale()

  const upDTL = (datetime: string | null) => {
    return datetime ? format(parse(datetime, 'YYYY/MM/DD HH:mm', locale.value), 'YYYY-MM-DDTHH:mm', locale.value) : null
  }

  const downDTL = (datetime: string | null) => {
    return datetime ? format(parse(datetime, 'YYYY-MM-DDTHH:mm', locale.value), 'YYYY/MM/DD HH:mm', locale.value) : ''
  }

  const formatHTML = (datetime: string | null) => {
    return datetime ? format(parse(datetime, 'YYYY/MM/DD HH:mm', locale.value), 'YYYY/MM/DD (ddd) HH:mm', locale.value) : ''
  }

  return { upDTL, downDTL, formatHTML }
}
