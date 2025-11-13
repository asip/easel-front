import type { FetchError, FetchResponse } from 'ofetch'

type MutationAPIOptions = {
  method: 'post' | 'put' | 'delete',
  url:string,
  body?: Record<string, any> | FormData,
  token?: string | null
}

export const useMutationApi = async <T=unknown, E=any>({ method, url, body = {}, token = null }: MutationAPIOptions) => {
  const { $api } = useNuxtApp()
  const { commonHeaders } = useConstants()

  const headers: Record<string, string> = commonHeaders.value

  const pending = ref<boolean>(true)

  const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const data = ref<T>()
  const error = ref<FetchError<E>>();

  if (method == 'post' || method == 'put'){
    try {
      data.value = await $api<T>(url, {
        method,
        body,
        headers,
        onResponse({ response  } : { response: FetchResponse<T> }) {
          if (method == 'post' && !tokenRef.value || method == 'put') tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
        }
      })
    } catch(err: any) {
      error.value = err as FetchError<E>
    }
  } else if (method == 'delete') {
    try {
      data.value = await $api<T>(url, {
        method: 'delete',
        headers
      })
    } catch(err: any) {
      error.value = err as FetchError<E>
    }
  }

  pending.value = false

  return { token: tokenRef.value, data: data.value, error: error.value, pending: pending.value }
}
