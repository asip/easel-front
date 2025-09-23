type PutAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePutApi = async <T,E=unknown>({ url, body = {}, token = null }: PutAPIOptions) => {
  const { $api } = useNuxtApp()
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const key = `${url}:${new Date().getTime()}`

  const tokenRef = ref<string>()

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const { data, error, status } = await useAsyncData<T,E>(key, () =>
    $api(url, {
      method: 'put',
      body,
      headers,
      onResponse({ response  } : { response: any }) {
        tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
      }
    })
  )

  pending.value = status.value === 'pending'

  return { token: tokenRef, data, error, pending }
}
