// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/styles/main.scss",
    "bootstrap-icons/font/bootstrap-icons.css"
  ],
  modules: [
    '@nuxt/image-edge',
  ]
})
