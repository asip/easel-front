import GoogleSignInPlugin from 'vue3-google-signin'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const options = {
    clientId: config.public.googleClientId
  }

  nuxtApp.vueApp.use(GoogleSignInPlugin, options)
})
