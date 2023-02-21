<template>
  <div>
    <Header/>
    <div class="container">
      <slot />
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">

const { locale, locales } = useI18n()

onUpdated(() =>{
  const browserLocale = window.navigator.language

  locale.value = (locales.value.includes(browserLocale) ? browserLocale : 'en')
})
</script>