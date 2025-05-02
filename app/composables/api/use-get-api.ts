import { format } from '@formkit/tempo'

interface SearchParams {
  [key: string]: any
}

type GetAPIOptions = { url:string, query?: SearchParams, token?: string | null }

export const useGetApi = async <T>({ url, query = {}, token = null }: GetAPIOptions) => {
  const { $api } = useNuxtApp()

  const { locale } = useLocale()
  const datetime = format(new Date(), 'YYYYMMDDHHmmss', locale.value)
  const key = `${url.replace('/', '-')}-${datetime}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const { data, error } = await useAsyncData<T>(key, () =>
    $api(url, {
      method: 'get',
      query,
      headers
    })
  )

  return { data, error }
}
