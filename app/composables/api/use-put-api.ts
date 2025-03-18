type PutAPIOptions = {
  url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePutApi = async ({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const { backendApiURL } = getConstants()

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
      method: 'put',
      body,
      headers
    })
  )

  pending.value = status.value === 'pending'

  return { data, error, pending }
}
