import { useApiFetch } from './use-api-fetch'

type PutAPIOptions = {
  url:string, body?: Record<string, any>, token?: string | null, locale?: string | null
}

export const usePutApi = async <T>({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
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

  const { data, error, status } = await useApiFetch<T>(url,
    {
      method: 'put',
      body,
      headers
    }
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
