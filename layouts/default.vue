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
import {useBrowserLocale} from "#i18n";

const { locale, locales } = useI18n()

onUpdated(() =>{
  const browserLocale: string | null = useBrowserLocale()

  locale.value = (browserLocale && locales.value.includes(browserLocale) ? browserLocale : 'en')
})
</script>