export type GetAPIOptions = QueryAPIOptions

export const useGetApi = async <T=unknown, E=any>({ url, query = {}, token = null, fresh = false, client = false }: GetAPIOptions) => {
  return useQueryApi<T, E>({ url,query, token, fresh, client })
}