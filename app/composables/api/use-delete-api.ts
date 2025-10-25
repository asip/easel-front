type DeleteAPIOptions = {
  url:string, token?: string | null
}

export const useDeleteApi = async <T>({ url, token = null }: DeleteAPIOptions) => {
  return useMutationApi<T>({ url, method: 'delete', token })
}
