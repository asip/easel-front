export const useSettings = function () {
  const runtimeConfig = useRuntimeConfig()

  const googleClientID = runtimeConfig.public.googleClientId as string

  const loginByPassword = runtimeConfig.public.loginByPassword as boolean

  return { googleClientID, loginByPassword }
}
