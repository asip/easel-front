<script lang="ts" setup>
import type { Frame } from '~/interfaces/frame'

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
    <div class="flex justify-center">
      <NuxtLink
        :to="`${frame?.file_url}`"
        class="lb"
      >
        <img
          :src="frame?.file_two_url"
          :alt="frame?.name"
          class=""
        >
      </NuxtLink>
    </div>
    <div class="flex justify-center">
      <NuxtLink
        v-if="page == 'profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: page } }"
        class=""
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else-if="page == 'user_profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: page, ref_id: userId} }"
        class=""
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="`/frames/${frame?.id}`"
        class=""
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
