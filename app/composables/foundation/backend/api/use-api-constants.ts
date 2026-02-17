export const useApiConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const backendOriginURL = computed<string | undefined>(() => {
    if (import.meta.client) {
      return runtimeConfig.public.backendOriginURL
    } else if (import.meta.server) {
      return runtimeConfig.backendOriginURL
    }
  })

  const backendApiPath = runtimeConfig.public.backendApiPath

  const baseURL = computed<string>(() => `${backendOriginURL.value}${backendApiPath}`)

  return { baseURL }
}
