<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.spotlight" class="mx-auto spotlight" :to="`${baseURL}${frame.file_url}`"><img :src="`${baseURL}${frame?.file_three_url}`" class="mx-auto"></NuxtLink>
    <NuxtLink v-else class="mx-auto" name="lm" :to="`${baseURL}${frame.file_url}`"><img :src="`${baseURL}${frame?.file_three_url}`" class="mx-auto"></NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${baseURL}${frame?.file_three_url}`" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
  import { Luminous } from 'luminous-lightbox'
  import { Frame } from '~/composables/use_frame';

  const props = defineProps({
    original: Boolean,
    spotlight: Boolean
  })

  const frame: Frame | undefined = inject('frame')

  const { baseURL } = useConstants()

  onMounted(() => {
    if (props.spotlight){
      import('spotlight.js/src/js/spotlight').then(module =>
        module.init()
      )
    } else {
      const elm = document.querySelector('[name="lm"]')
      new Luminous(elm, { showCloseButton: true })
    }
  })
</script>