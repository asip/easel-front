<script lang="ts" setup>
import type { Frame } from '~/interfaces/frame'

const frame = defineModel<Frame>()
</script>

<template>
  <div
    class="card-block"
    style="padding-top: 10px;padding-bottom: 10px;"
  >
    <FramesPreviewTags v-model="frame" :list="true" />
    <br>
    <NuxtLink
      :to="`${frame?.file_url}`"
      name="lm"
      class="mx-auto"
    >
      <img
        :src="`${frame?.file_two_url}`"
        :alt="frame?.name"
        class="card-img-top"
      >
    </NuxtLink>
    <br>
    <div class="d-flex justify-content-sm-center">
      <NuxtLink :to="`/users/${frame?.user_id}`">
        <div class="badge rounded-pill bg-light text-info">{{ frame?.user_name }}</div>
      </NuxtLink>
    </div>
    <div class="d-flex justify-content-sm-center">
      <NuxtLink
        :to="`/frames/${frame?.id}`"
        class="mx-auto"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
