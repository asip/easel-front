<script lang="ts" setup>
const { imgUrl, linkUrl, small } = defineProps<{
  imgUrl: string | undefined
  linkUrl: string | undefined
  small: boolean
}>()

const options = {
  gl: { selector: '#image' },
}

const { initLightbox, closeLightbox } = useLightbox(options)

onMounted(async () => {
  if (import.meta.client) {
    await initLightbox()
  }
})

onUnmounted(() => {
  if (import.meta.client) closeLightbox()
})
</script>

<template>
  <NuxtLink v-if="linkUrl" id="image" class="mx-auto" :to="linkUrl">
    <img v-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
    <img v-else :src="imgUrl" alt="" class="mx-auto" >
  </NuxtLink>
  <img v-else-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
  <img v-else :src="imgUrl" alt="" class="mx-auto" >
</template>
