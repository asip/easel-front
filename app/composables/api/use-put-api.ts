type PutAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePutApi = async <T=unknown, E=any>({ url, body = {}, token = null }: PutAPIOptions) => {
  return useMutationApi<T, E>({ url, method: 'put', body, token })
}
