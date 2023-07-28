export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const backendOriginURL: Ref = computed(
    () => runtimeConfig.backendOriginURL ? (runtimeConfig.backendOriginURL as string) : (runtimeConfig.public.backendOriginURL as string)
  )

  const backendApiURL: Ref = computed(
    () => `${backendOriginURL.value}/api/v1`
  )

  const googleClientID: string = runtimeConfig.public.googleClientId

  return { backendOriginURL, backendApiURL, googleClientID }
}
