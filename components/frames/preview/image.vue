<template>
  <div v-if="original" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="spotlight" class="mx-auto spotlight" :to="`${base_url}${frame.file_url}`"><img :src="`${base_url}${frame?.file_three_url}`" class="mx-auto"></NuxtLink>
    <NuxtLink v-else class="mx-auto" name="lm" :to="`${base_url}${frame.file_url}`"><img :src="`${base_url}${frame?.file_three_url}`" class="mx-auto"></NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${base_url}${frame?.file_three_url}`" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
  import Spotlight from "spotlight.js/src/js/spotlight"
  import { Luminous } from 'luminous-lightbox'
  import { Frame } from '~~/composables/use_frame';

  const props = defineProps({
    original: Boolean,
    spotlight: Boolean
  })

  const original = props.original
  const spotlight = props.spotlight

  const frame: Frame | undefined = inject('frame')

  const base_url = "http://localhost:3000"

  onMounted(() => {
    if (spotlight){
      if(document){
        Spotlight.init()
      }
    } else {
      const elm = document.querySelector('[name="lm"]')
      new Luminous(elm, { showCloseButton: true })
    }
  })
</script>