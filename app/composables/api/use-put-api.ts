import { useApiFetch } from './use-api-fetch'

type PutAPIOptions = {
  url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePutApi = async ({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, status } = await useApiFetch(url,
    {
      method: 'put',
      body,
      headers
    }
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
