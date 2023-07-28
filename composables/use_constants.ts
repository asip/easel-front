export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const isSSR = ref(false)

  const backendOriginURL: Ref = computed(
    () => isSSR.value ? (runtimeConfig.backendOriginURL as string) : (runtimeConfig.public.backendOriginURL as string)
  )

  const backendApiURL: Ref = computed(
    () => `${backendOriginURL.value}/api/v1`
  )

  const googleClientID: string = runtimeConfig.public.googleClientId

  return { isSSR, backendOriginURL, backendApiURL, googleClientID }
}
