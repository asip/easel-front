interface SearchParams {
  [key: string]: any
}

export type GetAPIOptions = {
  url: string,
  query?: SearchParams,
  token?: string | null,
  fresh?: boolean
  more?: boolean
}

export const useGetApi = async <T,E=unknown>({ url, query = {}, token = null, fresh = false, more = false }: GetAPIOptions) => {
  let key: string | null = null

  const { $api } = useNuxtApp()
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client
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
    key = `${url}:${new Date().getTime()}`
  } else {
    key = url
  }

  const { data, error, refresh } = await useAsyncData<T,E>(key, () =>
    $api(url, options)
  )

  if(fresh){
    await refresh()
  }

  return { token: tokenRef, data, error, refresh }
}
