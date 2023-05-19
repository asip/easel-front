<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink class="mx-auto" name="lm" :to="`${backendOriginURL}${user?.image_three_url}`">
      <img :src="`${backendOriginURL}${user?.image_three_url}`" alt="" class="mx-auto" style="width:100px;height:100px;">
    </NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${backendOriginURL}${user?.image_three_url}`" alt="" class="mx-auto" style="width:100px;height:100px;">
  </div>
  <br>
</template>

<script setup lang="ts">
// @ts-ignore
import { Luminous } from 'luminous-lightbox'
import { onMounted } from 'vue'
import { User } from '~/composables/use_login_user'
import { useConstants } from '~/composables/use_constants'

const props = defineProps({
  original: Boolean
})

const { backendOriginURL } = useConstants()
const user: User | undefined = inject('user')

// console.log(login_user?.value.image_three_url)

onMounted(() => {
  if (props.original) {
    const elm = document.querySelector('[name="lm"]')
    new Luminous(elm, { showCloseButton: true })
  }
})
</script>
