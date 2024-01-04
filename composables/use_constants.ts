export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const backendOriginURL: Ref = computed(
    () => {
      if (import.meta.client) {
        return runtimeConfig.public.backendOriginURL
      } else if (import.meta.server) {
        return runtimeConfig.backendOriginURL
      }
    }
  )

  const backendApiURL: Ref = computed(
    () => `${backendOriginURL.value}/api/v1`
  )

  const googleClientID: string = runtimeConfig.public.googleClientId

  return { backendApiURL, googleClientID }
}
