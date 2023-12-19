type GetAPIOptions = { key:string, url:string, query?: any, token?: string | null }

export const useGetApi = async ({ key, url, query = {}, token = null }: GetAPIOptions) => {
  let statusCode!: number

  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const { data, error } = await useAsyncData(key, () =>
    $fetch(url, {
      method: 'get',
      query,
      headers,
      async onResponse ({ response }) {
        statusCode = response.status
      }
    })
  )

  return { data, error, statusCode }
}
