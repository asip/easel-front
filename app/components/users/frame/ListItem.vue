<script lang="ts" setup>
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()

const { userId, page = undefined } = defineProps<{
  userId: string | undefined
  page?: string
}>()
</script>

<template>
  <div
    class="card-body"
  >
    <figure class="flex justify-center">
      <NuxtLink
        :to="`${frame?.file_url}`"
        class="lb w-full"
      >
        <img
          :src="frame?.file_two_url"
          :alt="frame?.name"
          class="w-full h-auto"
        >
      </NuxtLink>
    </figure>
    <div class="flex justify-center">
      <NuxtLink
        v-if="page == 'profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: JSON.stringify({ from: page }) } }"
        class="link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else-if="page == 'user_profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: JSON.stringify({ from: page, id: userId }) } }"
        class="link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="`/frames/${frame?.id}`"
        class="link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
