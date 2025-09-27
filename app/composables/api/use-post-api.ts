type PostAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePostApi = async <T,E=unknown>({ url, body = {}, token = null }: PostAPIOptions) => {
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
      method: 'post',
      body,
      headers,
      onResponse({ response  } : { response: any }) {
        if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
      }
    })
  )

  pending.value = status.value === 'pending'

  return { token: tokenRef.value, response: data.value, error: error.value, pending: pending.value }
}
