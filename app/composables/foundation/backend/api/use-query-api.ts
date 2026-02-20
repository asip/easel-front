import type { FetchError, FetchResponse } from 'ofetch'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

interface SearchParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type QueryAPIOptions = {
  url: string
  query?: SearchParams
  token?: string | null
  signal?: AbortSignal
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
  fresh?: boolean
  cache?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQueryApi = async <T = unknown, E = any>({
  url,
  query = {},
  token = null,
  fresh = false,
  cache = true,
  signal,
  onRequestError,
  onResponseError,
}: QueryAPIOptions) => {
  const { $api } = useNuxtApp()
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = commonHeaders.value

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const options: NitroFetchOptions<NitroFetchRequest, 'get'> = {
    baseURL: baseURL.value,
    method: 'get',
    query,
    headers,
    onResponse({ response }: { response: FetchResponse<T> }) {
      if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
    },
  }

  if (signal) {
    options.signal = signal
  }

  if (onRequestError) {
    options.onRequestError = onRequestError
  }

  if (onResponseError) {
    options.onResponseError = onResponseError
  }

  if (cache) {
    const { data, error, refresh, pending } = await useAsyncData<T, E>(url, () =>
      $api(url, options),
    )

    if (fresh) {
      await refresh()
    }

    return {
      token: tokenRef.value,
      data: data.value,
      error: error.value,
      refresh,
      pending: pending.value,
    }
  } else {
    const pending = ref<boolean>(true)

    const data = ref<T>()
    const error = ref<FetchError<E>>()

    try {
      data.value = await $api<T>(url, options)
    } catch (err: unknown) {
      error.value = err as FetchError<E>
    }

    pending.value = false

    return { token: tokenRef.value, data: data.value, error: error.value, pending: pending.value }
  }
}
