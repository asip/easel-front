export const useConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const backendOriginURL: string = runtimeConfig.public.backendOriginURL
  const backendApiURL: string = `${runtimeConfig.public.backendOriginURL}/api/v1`
  const googleClientID: string = runtimeConfig.public.googleClientId

  return { backendOriginURL, backendApiURL, googleClientID }
}