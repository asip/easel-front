export default defineNuxtPlugin((nuxtApp) => {
  const api = createFetch()
  return {
    provide: {
      api,
    },
  }
})
