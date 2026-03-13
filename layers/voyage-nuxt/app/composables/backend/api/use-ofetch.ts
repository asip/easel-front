import type { $Fetch, FetchOptions, FetchError } from 'ofetch'

// eslint-disable-next-line
export const useOFetch = async <T = unknown, E = any>(
  url: string,
  options?: FetchOptions<'json'>,
) => {
  const { $api } = useNuxtApp()

  const pending = ref<boolean>(true)

  const data = ref<T>()
  const error = ref<FetchError<E>>()

  try {
    data.value = await ($api as $Fetch)<T>(url, options)
  } catch (err: unknown) {
    error.value = err as FetchError<E>
  }

  pending.value = false

  return { data: data.value, error: error.value, pending: pending.value }
}
