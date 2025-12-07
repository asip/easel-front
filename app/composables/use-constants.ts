export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const backendOriginURL = computed<string | undefined>(
    () => {
      if (import.meta.client) {
        return runtimeConfig.public.backendOriginURL
      } else if (import.meta.server) {
        return runtimeConfig.backendOriginURL
      }
    }
  )

  const backendApiURL = computed<string>(
    () => `${backendOriginURL.value}/api/v1`
  )

  const googleClientID: string = runtimeConfig.public.googleClientId

  return { backendApiURL, googleClientID }
}
