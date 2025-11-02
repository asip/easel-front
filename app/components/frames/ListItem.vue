<script lang="ts" setup>
import type { Frame } from '~/interfaces'

const front = ref(true)
const frame = defineModel<Frame>()

const onFlipClick = () => {
  front.value = !front.value
}
</script>

<template>
  <div class="card-body">
    <div v-show="front">
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
    </div>
    <div v-show="!front">
      <div class="flex justify-center flex-wrap mb-1">
        <FramesPreviewTags v-model="frame" :list="true" />
      </div>
      <div class="flex justify-center">
        <NuxtLink :to="`/users/${frame?.user_id}`">
          <div class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ frame?.user_name }}</div>
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-center gap-1">
      <button
        v-if="front"
        type="button"
        class=""
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-right-circle" />
      </button>
      <button
        v-else
        type="button"
        class=""
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-left-circle" />
      </button>
      <NuxtLink
        :to="`/frames/${frame?.id}`"
        class="flex link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
