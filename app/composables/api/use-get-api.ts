import { useApiFetch } from './use-api-fetch'

type GetAPIOptions = { url:string, query?: any, token?: string | null }

export const useGetApi = async ({ url, query = {}, token = null }: GetAPIOptions) => {
  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const { data, error } = await useApiFetch(url,
    {
      method: 'get',
      query,
      headers
    }
  )

  return { data, error }
}
