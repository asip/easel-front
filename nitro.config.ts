import {defineNitroConfig} from 'nitropack'

// https://nitro.unjs.io/config#devproxy
// https://github.com/http-party/node-http-proxy#options
export default defineNitroConfig({
  devProxy: {
    '/api/': {
      target: 'http://localhost:3000/api/v1/',
      changeOrigin: true,
      hostRewrite: true,
      cookieDomainRewrite: true,
      headers: {
        'X-Forwarded-Host': 'localhost:3000',
        'X-Forwarded-Proto': 'http'
      },
    },
    '/uploads/': {
      target: 'http://localhost:3000/uploads/',
      changeOrigin: true,
      hostRewrite: true,
      cookieDomainRewrite: true,
      headers: {
        'X-Forwarded-Host': 'localhost:3000',
        'X-Forwarded-Proto': 'http'
      },
    }
  }
})