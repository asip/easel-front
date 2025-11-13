type DeleteAPIOptions = {
  url:string, token?: string | null
}

export const useDeleteApi = async <T=unknown, E=any>({ url, token = null }: DeleteAPIOptions) => {
  return useMutationApi<T, E>({ url, method: 'delete', token })
}
