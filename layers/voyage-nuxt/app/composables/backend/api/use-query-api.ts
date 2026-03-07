import { useAsyncData, useNuxtApp } from 'nuxt/app'

import type { $Fetch, FetchError, FetchOptions, FetchResponse } from 'ofetch'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

interface SearchParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type QueryAPIOptions = {
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
export const useQueryApi = async <T = unknown, E = any>(url: string, options?: QueryAPIOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $api } = useNuxtApp() as any
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = commonHeaders.value

  const fresh: boolean = options?.fresh ?? false
  const cache: boolean = options?.cache ?? true

  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`
    tokenRef.value = options.token
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getOptions: any = {
    baseURL: baseURL.value,
    method: 'get',
    query: options?.query ?? {},
    headers,
    onResponse({ response }: { response: FetchResponse<T> }) {
      if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
    },
  }

  if (options?.signal) {
    getOptions.signal = options.signal
  }

  if (options?.onRequestError) {
    getOptions.onRequestError = options.onRequestError
  }

  if (options?.onResponseError) {
    getOptions.onResponseError = options.onResponseError
  }

  if (cache) {
    const { data, error, refresh, pending } = await useAsyncData<T, E>(url, () =>
      $api(url, getOptions as NitroFetchOptions<NitroFetchRequest, 'get'>),
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.value = await ($api as $Fetch)<T>(url, getOptions as FetchOptions<'json', any>)
    } catch (err: unknown) {
      error.value = err as FetchError<E>
    }

    pending.value = false

    return { token: tokenRef.value, data: data.value, error: error.value, pending: pending.value }
  }
}
