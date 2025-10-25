export type GetAPIOptions = QueryAPIOptions

export const useGetApi = async <T>({ url, query = {}, token = null, fresh = false, more = false }: GetAPIOptions) => {
  return useQueryApi<T>({ url,query, token, fresh, more })
}