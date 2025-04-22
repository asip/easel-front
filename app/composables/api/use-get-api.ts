type GetAPIOptions = { url:string, query?: any, token?: string | null }

export const useGetApi = async ({ url, query = {}, token = null }: GetAPIOptions) => {
  const { backendApiURL } = useConstants()

  const fullURL = `${backendApiURL.value}${url}`

  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const { data, error } = await useFetch(fullURL,
    {
      method: 'get',
      query,
      headers
    }
  )

  return { data, error }
}
