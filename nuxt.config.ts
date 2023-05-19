// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
export default defineNuxtConfig({
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/i18n'
  ],

  i18n: {
    lazy: true,
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: true,
      redirectOn: 'root',  // recommended
    },
    strategy: 'no_prefix',
    langDir: 'lang',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'ja',
        file: 'ja.json'
      }
    ]
  },

  // @ts-ignore
  runtimeConfig: {
    public: {
      backendOriginURL: 'http://localhost:3000',
      googleClientId: ''
    }
  },

  css: [
    '@/assets/styles/main.scss',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  build: {
    transpile: ['vue-sonner']
  },
  devtools: true
})
