export const createFetch = () => {
  return $fetch.create({
    baseURL: useConstants().backendApiURL.value
  })
}
