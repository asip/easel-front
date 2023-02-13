export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const baseURL: string = runtimeConfig.public.baseURL
  const baseApiURL: string = runtimeConfig.public.baseApiURL
  const googleClientID: string = runtimeConfig.googleClientId

  return { baseURL, baseApiURL, googleClientID }
}