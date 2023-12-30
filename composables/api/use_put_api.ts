type PutAPIOptions = {
  key:string, url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePutApi = async ({ key, url, body = {}, token = null, locale = null }: PutAPIOptions) => {
  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (locale) {
    headers['Accept-Language'] = locale
  }

  const { data, error, pending } = await useAsyncData(key, () =>
    $fetch(url, {
      method: 'put',
      body,
      headers
    })
  )

  return { data, error, pending }
}
