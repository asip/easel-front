<script lang="ts" setup>
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()
</script>

<template>
  <div class="card-body">
    <FramesPreviewTags v-model="frame" :list="true" />
    <figure class="flex justify-center">
      <NuxtLink
        :to="`${frame?.file_url}`"
        class="lb w-full"
      >
        <img
          :src="`${frame?.file_two_url}`"
          :alt="frame?.name"
          class="w-full h-auto"
        >
      </NuxtLink>
    </figure>
    <div class="flex justify-center">
      <NuxtLink :to="`/users/${frame?.user_id}`">
        <div class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ frame?.user_name }}</div>
      </NuxtLink>
    </div>
    <div class="flex justify-center">
      <NuxtLink
        :to="`/frames/${frame?.id}`"
        class="link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
