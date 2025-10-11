import type { FetchError } from 'ofetch'

type DeleteAPIOptions = {
  url:string, token?: string | null
}

export const useDeleteApi = async <T>({ url, token = null }: DeleteAPIOptions) => {
  const { $api } = useNuxtApp()
  const { locale } = useLocale()
  const { timeZone } = useTimeZone()

  const key = `${url}:${new Date().getTime()}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Accept-Language': locale.value,
    'Time-Zone': timeZone.value.client
  }

  const pending = ref<boolean>(true)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  /*
  const { data, error, status } = await useAsyncData<T,E>(key, () =>
    $api(url, {
      method: 'delete',
      headers
    })
  )
  */

  const data = ref<T>()
  const error = ref<FetchError>();

  try {
    data.value = await $api(url, {
      method: 'delete',
      headers
    })
  } catch(err: any) {
    error.value = err as FetchError
  }

  // pending.value = status.value === 'pending'
  pending.value = false

  return { data: data.value, error: error.value, pending: pending.value }
}
