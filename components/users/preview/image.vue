<template>
  <div v-if="props.original" class="d-flex justify-content-sm-center">
    <NuxtLink class="mx-auto" name="lm" :to="`${baseURL}${user?.image_three_url}`"><img :src="`${baseURL}${user?.image_three_url}`" class="mx-auto" style="width:100px;height:100px;"></NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${baseURL}${user?.image_three_url}`" class="mx-auto" style="width:100px;height:100px;">
  </div>
  <br>
</template>

<script setup lang="ts">
  import { Luminous } from 'luminous-lightbox'
  import { User, useLoginUser } from '~/composables/use_login_user'
  import { useConstants } from '~/composables/use_constants'
  import { onMounted } from 'vue';

  const props = defineProps({
    original: Boolean
  })

  const { baseURL } = useConstants()
  const user: User | undefined = inject('user')

  //console.log(login_user?.value.image_three_url)

  onMounted(() => {
    if (props.original){
      const elm = document.querySelector('[name="lm"]')
      new Luminous(elm, { showCloseButton: true })
    }
  })
</script>