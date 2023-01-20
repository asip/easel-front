<template>
  <div v-if="original" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="spotlight" class="mx-auto spotlight"><img :src="`${base_url}${frame.file_three_url}`" class="mx-auto"></NuxtLink>
    <NuxtLink v-else class="mx-auto spotlight" name="lm"><img :src="`${base_url}${frame.file_three_url}`" class="mx-auto"></NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${base_url}${frame?.file_three_url}`" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
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

  })
</script>