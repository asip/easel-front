<script lang="ts" setup>
import type { Frame } from '~/interfaces/frame'

const frame = defineModel<Frame>()

const { userId, page } = defineProps<{
  userId: string | undefined
  page?: string
}>()
</script>

<template>
  <div
    class="card-block"
    style="padding-top: 10px;padding-bottom: 10px;padding-bottom: 10px;"
  >
    <NuxtLink
      :to="`${frame?.file_url}`"
      name="lm"
      class="mx-auto"
    >
      <img
        :src="frame?.file_two_url"
        :alt="frame?.name"
        class="card-img-top"
      >
    </NuxtLink>
    <br>
    <div class="d-flex justify-content-sm-center">
      <NuxtLink
        v-if="page == 'profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: page } }"
        class="mx-auto"
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else-if="page == 'user_profile'"
        :to="{ path: `/frames/${frame?.id}`, query: { ref: page, ref_id: userId} }"
        class="mx-auto"
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="`/frames/${frame?.id}`"
        class="mx-auto"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
