import { parse, format } from '@formkit/tempo'

export const useDatetimeLocalFormat = () => {
  const { locale } = useLocale()

  const upDTL = (datetime: string) => {
    return format(parse(datetime, 'YYYY/MM/DD HH:mm:ss', locale.value), 'YYYY-MM-DDTHH:mm', locale.value)
  }

  const downDTL = (datetime: string) => {
    return format(parse(datetime, 'YYYY-MM-DDTHH:mm', locale.value), 'YYYY/MM/DD HH:mm:ss', locale.value)
  }

  return { upDTL, downDTL }
}
