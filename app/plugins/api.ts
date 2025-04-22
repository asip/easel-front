export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: useConstants().backendApiURL.value
  })
  // useNuxtApp().$api で使用可能にする
  return {
    provide: {
      api,
    },
  }
})