<script setup lang="ts">
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
    script: []
  }
)
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <div class="container mx-auto bg-aliceblue-200">
      <slot />
    </div>
    <Footer />
  </div>
</template>
