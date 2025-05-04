interface SearchParams {
  [key: string]: any
}

type GetAPIOptions = { key?: string | null, url: string, query?: SearchParams, token?: string | null }

export const useGetApi = async <T>({ key = null, url, query = {}, token = null }: GetAPIOptions) => {
  const { $api } = useNuxtApp()

  //const key = `${url}-${new Date().getTime()}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const options: any = {
    method: 'get',
    query,
    headers
  }

  if (key == null) {
    key = url
  }

  const { data, error } = await useAsyncData<T>(key, () =>
    $api(url, options)
  )

  return { data, error }
}
