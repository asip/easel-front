// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:true,
  app: {
    head: {
      title: "Easel",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
      ],
      link: [
        { href: "/palette.svg", type: "image/svg+xml", rel: "icon" },
        { href: "/palette.svg", type: "image/svg+xml", rel: "mask-icon", color: "#000000" }
      ],
      script: [
        { src: 'https://apis.google.com/js/api.js' },
        { src: 'https://accounts.google.com/gsi/client' }
      ]
    }
  },
  css: [
    "~/assets/styles/main.scss",
    "bootstrap-icons/font/bootstrap-icons.css"
  ],
  modules: [
    '@nuxt/image-edge',
  ],
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000',
      baseApiURL: 'http://localhost:3000/api/v1',
      googleClientId: ''
    }
  }
})
