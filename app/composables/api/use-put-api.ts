type PutAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePutApi = async <T>({ url, body = {}, token = null }: PutAPIOptions) => {
  return useMutationApi<T>({ url, method: 'put', body, token })
}
