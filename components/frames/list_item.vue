<template>
  <div class="card-block" style="padding-top: 10px;padding-bottom: 10px;">
    <NuxtLink :to="`${frame.file_url}`" name="lm" class="mx-auto">
      <img :src="`${frame.file_two_url}`" :alt="frame.name" class="card-img-top">
    </NuxtLink>
    <br>
    <div class="d-flex justify-content-sm-center">
      <NuxtLink :to="`/frames/${frame.id}`" class="mx-auto">
        {{ frame.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const frame = defineModel<Frame>()
</script>
