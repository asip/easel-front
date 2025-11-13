import type { FetchError, FetchResponse } from 'ofetch'

interface SearchParams {
  [key: string]: any
}

export type QueryAPIOptions = {
  url: string,
  query?: SearchParams,
  token?: string | null,
  fresh?: boolean
  more?: boolean
}

export const useQueryApi = async <T=unknown, E=any>({ url, query = {}, token = null, fresh = false, more = false }: QueryAPIOptions) => {
  const { $api } = useNuxtApp()
  const { commonHeaders } = useConstants()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = commonHeaders.value

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const options: any = {
    method: 'get',
    query,
    headers,
    onResponse({ response  } : { response: FetchResponse<T> }) {
      if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
    }
  }

  if (more) {
    const pending = ref<boolean>(true)

    const data = ref<T>()
    const error = ref<FetchError<E>>();

    try {
      data.value = await $api<T>(url, options)
    } catch(err: any) {
      error.value = err as FetchError<E>
    }

    pending.value = false

    return { token: tokenRef.value, data: data.value, error: error.value, pending: pending.value }
  } else {
    const { data, error, refresh, pending } = await useAsyncData<T, E>(url, () =>
      $api(url, options)
    )

    if (fresh){
      await refresh()
    }

    return { token: tokenRef.value, data: data.value, error: error.value, refresh, pending: pending.value }
  }
}
