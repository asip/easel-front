<template>
  <div v-if="model?.preview_url" class="d-flex justify-content-sm-center" style="display: block;padding-bottom:5px;">
    <img :src="model.preview_url" alt="" class="mx-auto" style="max-width: 300px; max-height: 300px; display: block;">
    <br>
  </div>
</template>

<script setup lang="ts">

  const { backendOriginURL } = useConstants()
  const model: any = inject('model')

  if(model){
    if(model.file) {
      model.preview_url = `${backendOriginURL}${model?.file_three_url}`
    } else if(model.image) {
      model.preview_url  = `${backendOriginURL}${model?.image_three_url}`
    }
  }
</script>