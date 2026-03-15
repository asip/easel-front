export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const googleClientID = runtimeConfig.public.googleClientId as string

  return { googleClientID }
}
