interface SearchParams {
  [key: string]: any
}

type GetAPIOptions = {
  url: string,
  query?: SearchParams,
  token?: string | null,
  more?: boolean
}

export const useGetApi = async <T>({ url, query = {}, token = null, more = false }: GetAPIOptions) => {
  let key: string | null = null

  const { $api } = useNuxtApp()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const options: any = {
    method: 'get',
    query,
    headers,
    onResponse({ response  } : { response: any }) {
      if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
    }
  }

  if (more) {
    key = `${url}-${new Date().getTime()}`
  } else {
    key = url
  }

  const { data, error } = await useAsyncData<T>(key, () =>
    $api(url, options)
  )

  return { token: tokenRef, data, error }
}
