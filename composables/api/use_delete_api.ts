type DeleteAPIOptions = {
  url:string, token?: string | null, locale?: string | null
}

export const useDeleteApi = async ({ url, token = null, locale = null }: DeleteAPIOptions) => {
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
    $fetch(fullURL,
      {
        method: 'delete',
        headers
      }
    )
  )

  return { data, error, pending }
}
