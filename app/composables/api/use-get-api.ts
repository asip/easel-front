import { useApiFetch } from './use-api-fetch'

interface SearchParams {
  [key: string]: any
}

type GetAPIOptions = { url:string, query?: SearchParams, token?: string | null }

export const useGetApi = async <T>({ url, query = {}, token = null }: GetAPIOptions) => {
  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const { data, error } = await useApiFetch<T>(url,
    {
      method: 'get',
      query,
      headers
    }
  )

  return { data, error }
}
