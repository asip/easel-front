type PostAPIOptions = {
  key:string, url:string, body?: any, token?: string | null, locale?: string | null
}

export const usePostApi = async ({ key, url, body = {}, token = null, locale = null }: PostAPIOptions) => {
  let statusCode!: number

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
      headers,
      async onResponse ({ response }) {
        statusCode = response.status
      }
    })
  )

  return { data, error, pending, statusCode }
}
