// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // future: {
  //  compatibilityVersion: 4,
  // },

  //experimental: {
  //  granularCachedData: false
  //},

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@regle/nuxt',
    'vue-sonner/nuxt'
  ],

  plugins: [],

  i18n: {
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
      cookieCrossOrigin: false,
      redirectOn: 'root'// recommended
    },
    strategy: 'no_prefix'
  },

  runtimeConfig: {
    public: {
      timeZone: 'Asia/Tokyo',
      backendOriginURL: 'http://localhost:3000',
      googleClientId: ''
    },
    backendOriginURL: 'http://localhost:3000'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  css: [
    '@/assets/styles/tailwind.css',
    '@/assets/styles/app.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  /* build: {
    transpile: ['vue-sonner']
  }, */

  devtools: {
    enabled: true
  },

  pages: true,
  compatibilityDate: '2025-04-18'
})