import { useApiConstants } from "./use-api-constants"

export const createFetch = () => {
  return $fetch.create({
    baseURL: useApiConstants().backendApiURL.value
  })
}
