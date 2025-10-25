type PostAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePostApi = async <T>({ url, body = {}, token = null }: PostAPIOptions) => {
  return useMutationApi<T>({ url, method: 'post', body, token })
}
