<script lang="ts" setup>
import type { Frame } from '~/interfaces'
import type { RefQuery } from '~/types';

const frame = defineModel<Frame>()

const { userId, page = undefined } = defineProps<{
  userId: string | undefined
  page?: string
}>()

const { loggedIn, loginUser } = useAccount()

const queryMapWithRef = computed<RefQuery>(() => {
  if (page == 'profile') {
    return { ref: JSON.stringify({ from: page }) }
  } else if (page == 'user_profile') {
    return { ref: JSON.stringify({ from: page, id: userId }) }
  } else {
    return {}
  }
})

</script>

<template>
  <div
    class="card-body"
  >
    <div v-if="loggedIn && frame?.user_id == loginUser.id"  class="flex justify-start">
      <div class="badge badge-xs badge-outline badge-accent rounded-full">{{ $t(`enums.private.${frame?.private}`) }} </div>
    </div>
    <figure class="flex justify-center">
      <NuxtLink
        :to="`${frame?.file_url}`"
        class="lb w-full"
      >
        <img
          :src="frame?.file_six_url"
          :alt="frame?.name"
          class="w-full h-auto"
        >
      </NuxtLink>
    </figure>
    <div class="flex justify-center">
      <NuxtLink
        v-if="page == 'profile' || page == 'user_profile'"
        :to="{ path: `/frames/${frame?.id}`, query: queryMapWithRef }"
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
