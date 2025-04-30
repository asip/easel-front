import { useApiFetch } from './use-api-fetch'

type DeleteAPIOptions = {
  url:string, token?: string | null, locale?: string | null
}

export const useDeleteApi = async <T>({ url, token = null, locale = null }: DeleteAPIOptions) => {
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
      method: 'delete',
      headers
    }
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
