// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n'
  ],

  i18n: {
    lazy: true,
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'ja',
        file: 'ja.json'
      }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: true,
      redirectOn: 'root'// recommended
    },
    strategy: 'no_prefix'
  },

  // @ts-ignore
  runtimeConfig: {
    public: {
      backendOriginURL: 'http://localhost:3000',
      googleClientId: ''
    },
    backendOriginURL: 'http://localhost:3000'
  },

  css: [
    '@/assets/styles/main.scss',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  build: {
    transpile: ['vue-sonner']
  },
  devtools: {
    enabled: true
  }
})
