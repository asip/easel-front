export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: useConstants().backendApiURL.value
  })
  return {
    provide: {
      api,
    },
  }
})