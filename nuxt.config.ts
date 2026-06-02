// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/test-utils', '@nuxt/eslint', '@regle/nuxt', 'vue-sonner/nuxt'],
  plugins: [],
  extends: ['@vesperjs/nuxt'],

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'ja',
        file: 'ja.json',
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: false,
      redirectOn: 'root', // recommended
    },
    strategy: 'no_prefix',
  },

  runtimeConfig: {
    public: {
      loginByPassword: false,
      timeZone: 'Asia/Tokyo',
      backendApiOrigin: 'http://localhost:3000',
      backendApiPath: '/api/v1',
      googleClientId: '',
    },
    backendApiOrigin: 'http://localhost:3000',
  },

  vite: {
    optimizeDeps: {
      include: [
        'glightbox', // CJS
        '@vuepic/vue-datepicker',
        '@yaireo/tagify',
        'photoswipe/lightbox',
        'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js',
        'vue3-google-signin',
        '@formkit/tempo',
        'sanitize-html', // CJS
        '@regle/core',
        '@regle/rules',
        '@tiptap/vue-3',
        '@tiptap/vue-3/menus',
        '@tiptap/starter-kit',
        '@tiptap/extension-link',
        '@tiptap/extension-underline',
        'photoswipe',
      ],
    },
    plugins: [tailwindcss()],
  },

  css: [
    '@/assets/styles/tailwind.css',
    '@/assets/styles/app.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],

  /* build: {
    transpile: ['vue-sonner']
  }, */

  devtools: {
    enabled: true,
  },

  pages: true,
  compatibilityDate: 'latest',
})
