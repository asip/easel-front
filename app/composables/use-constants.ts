export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const googleClientID: string = runtimeConfig.public.googleClientId

  return { googleClientID }
}
