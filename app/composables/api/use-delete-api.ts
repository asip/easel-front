type DeleteAPIOptions = {
  url:string, token?: string | null, locale?: string | null
}

export const useDeleteApi = async <T,E=unknown>({ url, token = null, locale = null }: DeleteAPIOptions) => {
  const { $api } = useNuxtApp()

  const key = `${url}:${new Date().getTime()}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, status } = await useAsyncData<T,E>(key, () =>
    $api(url, {
      method: 'delete',
      headers
    })
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
