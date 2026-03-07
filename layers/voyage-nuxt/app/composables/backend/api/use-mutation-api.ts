import { useNuxtApp } from 'nuxt/app'

import { ref } from 'vue'

import type { $Fetch, FetchError, FetchOptions, FetchResponse } from 'ofetch'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

type MutationAPIOptions = {
  method: 'post' | 'put' | 'delete'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | FormData
  token?: string | null
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMutationApi = async <T = unknown, E = any>(
  url: string,
  { method, body = {}, token = null, onRequestError, onResponseError }: MutationAPIOptions,
): Promise<{
  token: string | undefined
  data: T | undefined
  error: FetchError<E> | undefined
  pending: boolean
}> => {
  const { $api } = useNuxtApp()
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const pending = ref<boolean>(true)

  const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
    tokenRef.value = token
  }

  const data = ref<T>()
  const error = ref<FetchError<E>>()

  if (method == 'post' || method == 'put') {
    const options: FetchOptions<"json", any> = {
      baseURL: baseURL.value,
      method,
      body,
      headers,
      onResponse({ response }: { response: FetchResponse<T> }) {
        if ((method == 'post' && !tokenRef.value) || method == 'put')
          tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
      },
    }

    if (onRequestError) {
      options.onRequestError = onRequestError
    }

    if (onResponseError) {
      options.onResponseError = onResponseError
    }

    try {
      data.value = await ($api as $Fetch)<T>(url, options)
    } catch (err: unknown) {
      error.value = err as FetchError<E>
    }
  } else if (method == 'delete') {
    const options: FetchOptions<"json", any> = {
      baseURL: baseURL.value,
      method: 'delete',
      headers,
    }

    if (onRequestError) {
      options.onRequestError = onRequestError
    }

    if (onResponseError) {
      options.onResponseError = onResponseError
    }

    try {
      data.value = await ($api as $Fetch)<T>(url, options)
    } catch (err: unknown) {
      error.value = err as FetchError<E>
    }
  }

  pending.value = false

  return { token: tokenRef.value, data: data.value, error: error.value, pending: pending.value }
}
