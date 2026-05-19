<script lang="ts" setup>
const { imgUrl, linkUrl, small } = defineProps<{
  imgUrl: string | undefined
  linkUrl: string | undefined
  small: boolean
}>()

const options = {
  ps: { selector: '#gallery' },
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
  <div v-if="linkUrl" id="gallery">
    <NuxtLink class="mx-auto" :to="linkUrl">
      <img v-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
      <img v-else :src="imgUrl" alt="" class="mx-auto max-w-80 max-h-80" >
    </NuxtLink>
  </div>
  <img v-else-if="small" :src="imgUrl" alt="" class="mx-auto w-25 h-25 object-contain" >
  <img v-else :src="imgUrl" alt="" class="mx-auto max-w-80 max-h-80" >
</template>
