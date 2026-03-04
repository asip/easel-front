export const useApiConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const baseOrigin = computed<string | undefined>(() => {
    if (import.meta.client) {
      return runtimeConfig.public.backendApiOrigin
    } else if (import.meta.server) {
      return runtimeConfig.backendApiOrigin
    }
  })

  const basePath = runtimeConfig.public.backendApiPath

  const baseURL = computed<string>(() => `${baseOrigin.value}${basePath}`)

  return { baseURL }
}
