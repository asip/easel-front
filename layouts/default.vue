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
import {useLocale} from "~/composables/use_locale";

const { autoDetect } = useLocale()

onUpdated(() =>{
  autoDetect()
})
</script>