import { useApiFetch } from './use-api-fetch'

type PostAPIOptions = {
  url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePostApi = async ({ url, body = {}, token = null, locale = null }: PostAPIOptions) => {
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
      method: 'post',
      body,
      headers
    }
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
