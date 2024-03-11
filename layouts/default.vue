<script setup lang="ts">
import { useLocale } from '~/composables/use_locale'

useHead(
  {
    title: 'Easel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/palette.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/palette.svg' }
    ],
    script: [
      { src: 'https://apis.google.com/js/api.js' },
      { src: 'https://accounts.google.com/gsi/client' }
    ]
  }
)

const { autoDetect } = useLocale()

onMounted(() => {
  autoDetect()
})

onUpdated(() => {
  autoDetect()
})
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>
