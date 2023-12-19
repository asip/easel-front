type DeleteAPIOptions = {
  key:string, url:string, token?: string | null, locale?: string | null
}

export const useDeleteApi = async ({ key, url, token = null, locale = null }: DeleteAPIOptions) => {
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
    $fetch(url,
      {
        method: 'delete',
        headers,
        async onResponse ({ response }) {
          statusCode = response.status
        }
      }
    )
  )

  return { data, error, pending, statusCode }
}
