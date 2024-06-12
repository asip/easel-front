type PostAPIOptions = {
  url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePostApi = async ({ url, body = {}, token = null, locale = null }: PostAPIOptions) => {
  const { backendApiURL } = useConstants()

  const fullURL = `${backendApiURL.value}${url}`

  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  const pending = ref<boolean>(false)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, status } = await useAsyncData(url, () =>
    $fetch(fullURL, {
      method: 'post',
      body,
      headers
    })
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
