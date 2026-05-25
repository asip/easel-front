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
  await initLightbox()
})

onUnmounted(() => {
  closeLightbox()
})
</script>

<template>
  <NuxtLink v-if="linkUrl" id="image" class="mx-auto" :to="linkUrl">
    <img v-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
    <img v-else :src="imgUrl" alt="" class="mx-auto max-w-80 max-h-80" >
  </NuxtLink>
  <img v-else-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
  <img v-else :src="imgUrl" alt="" class="mx-auto max-w-80 max-h-80" >
</template>
