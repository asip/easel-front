type DeleteAPIOptions = {
  url:string, token?: string | null
}

export const useDeleteApi = async <T,E=unknown>({ url, token = null }: DeleteAPIOptions) => {
  const { $api } = useNuxtApp()
  const { locale } = useLocale()

  const key = `${url}:${new Date().getTime()}`

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Accept-Language': locale.value
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
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
