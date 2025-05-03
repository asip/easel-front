import { format } from '@formkit/tempo'

type PutAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null, locale?: string | null
}

export const usePutApi = async <T>({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const { $api } = useNuxtApp()

  const key = `${url}-${new Date().getTime()}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, status } = await useAsyncData<T>(key, () =>
    $api(url, {
      method: 'put',
      body,
      headers
    })
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
