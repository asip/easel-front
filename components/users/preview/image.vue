<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink ref="lightboxRef" class="mx-auto" :to="`${user?.image_three_url}`">
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
import { Luminous } from 'luminous-lightbox'
import { onMounted } from 'vue'
import type { User } from '~/interfaces/user'

const props = defineProps({
  original: Boolean
})

const user: User | undefined = inject('user')

// console.log(login_user?.value.image_three_url)

let lightbox: any

const lightboxRef = ref(null)

onMounted(() => {
  if (props.original) {
    const elm = lightboxRef.value
    lightbox = new Luminous(elm, { showCloseButton: true })
  }
})

onMounted(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})
</script>
