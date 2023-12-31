<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink id="image" class="mx-auto" :to="`${user?.image_three_url}`">
      <img :src="`${user?.image_three_url}`" alt="" class="mx-auto" style="width:100px;height:100px;">
    </NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${user?.image_three_url}`" alt="" class="mx-auto" style="width:100px;height:100px;">
  </div>
  <br>
</template>

<script setup lang="ts">
// @ts-ignore
import { onMounted } from 'vue'
import { useLightbox } from '~/composables/ui/use_lightbox'
import type { User } from '~/interfaces/user'

const props = defineProps<{
  original: boolean
}>()

const { initLMLightbox, closeLightbox } = useLightbox()

const user: User | undefined = inject('user')

// console.log(login_user?.value.image_three_url)

onMounted(() => {
  if (props.original) {
    initLMLightbox()
  }
})

onMounted(() => {
  closeLightbox()
})
</script>
