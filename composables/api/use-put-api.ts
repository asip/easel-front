type PutAPIOptions = {
  url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePutApi = async ({ url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const { backendApiURL } = useConstants()

  const fullURL = `${backendApiURL.value}${url}`

  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, pending } = await useAsyncData(url, () =>
    $fetch(fullURL, {
      method: 'put',
      body,
      headers
    })
  )

  return { data, error, pending }
}
