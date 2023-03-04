<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.spotlight" class="mx-auto spotlight" :to="`${baseURL}${frame?.file_url}`"><img :src="`${baseURL}${frame?.file_three_url}`" alt="" class="mx-auto"></NuxtLink>
    <NuxtLink v-else class="mx-auto" name="lm" :to="`${baseURL}${frame?.file_url}`"><img :src="`${baseURL}${frame?.file_three_url}`" alt="" class="mx-auto"></NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${baseURL}${frame?.file_three_url}`" alt="" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { Luminous } from 'luminous-lightbox'

  const props = defineProps({
    original: Boolean,
    spotlight: Boolean
  })

  const { frame } = inject('framer') as any

  const { baseURL } = useConstants()

  onMounted(() => {
    if (props.spotlight){
      // @ts-ignore
      import('spotlight.js/src/js/spotlight').then(module =>
        module.init()
      )
    } else {
      const elm = document.querySelector('[name="lm"]')
      new Luminous(elm, { showCloseButton: true })
    }
  })
</script>