type PostAPIOptions = {
  url:string, body?: Record<string, any> | FormData, token?: string | null
}

export const usePostApi = async <T=unknown, E=any>({ url, body = {}, token = null }: PostAPIOptions) => {
  return useMutationApi<T, E>({ url, method: 'post', body, token })
}
