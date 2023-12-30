type PostAPIOptions = {
  key:string, url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePostApi = async ({ key, url, body = {}, token = null, locale = null }: PostAPIOptions) => {
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
      method: 'post',
      body,
      headers
    })
  )

  return { data, error, pending }
}
