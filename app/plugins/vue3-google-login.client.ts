import vue3GoogleLogin from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (config.public.googleClientId) {
    const options = {
      clientId: config.public.googleClientId,
    }

    nuxtApp.vueApp.use(vue3GoogleLogin, options)
  }
})
