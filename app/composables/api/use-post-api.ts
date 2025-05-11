import { format } from '@formkit/tempo'

type PostAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null, locale?: string | null
}

export const usePostApi = async <T>({ url, body = {}, token = null, locale = null }: PostAPIOptions) => {
  const { $api } = useNuxtApp()

  const key = `${url}-${new Date().getTime()}`

  const tokenRef = ref<string>()

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, status } = await useAsyncData<T>(key, () =>
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

  return { token: tokenRef, data, error, pending }
}
