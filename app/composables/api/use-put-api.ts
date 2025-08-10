type PutAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null, locale?: string | null
}

export const usePutApi = async <T,E=unknown>({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const { $api } = useNuxtApp()

  const key = `${url}:${new Date().getTime()}`

  const tokenRef = ref<string>()

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  if (locale) {
    headers['Accept-Language'] = locale
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
