<script lang="ts" setup>
import type { Frame } from '~/interfaces'
import type { RefQuery } from '~/types';

const frame = defineModel<Frame>()

const { from = undefined } = defineProps<{
  from?: string
}>()

const { loggedIn, loginUser } = useAccount()
const { currentPage, frameQuery } = (from == 'profile' ? useAccountFrames() : useUserFrames())

const queryMapWithRef = computed<RefQuery>(() => {
  if (from == 'profile' || from == 'user_profile') {
    return { ref: JSON.stringify({ from }) }
  } else {
    return {}
  }
})

const onLinkClick = () => {
  if(frame.value?.page) {
    currentPage.value = frame.value?.page
    frameQuery.value.page = frame.value?.page
  }
}
</script>

<template>
  <div class="card-body">
    <div v-if="loggedIn && frame?.user_id == loginUser.id"  class="flex justify-start">
      <div class="badge badge-xs badge-outline badge-accent rounded-full">{{ $t(`enums.private.${frame?.private}`) }} </div>
    </div>
    <figure class="flex justify-center">
      <NuxtLink
        :to="`${frame?.file_url}`"
        class="w-full ps"
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
        v-if="from == 'profile' || from == 'user_profile'"
        :to="{ path: `/frames/${frame?.id}`, query: queryMapWithRef }"
        class="link link-hover"
        @click="onLinkClick"
      >
        {{ frame?.name }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="`/frames/${frame?.id}`"
        class="link link-hover"
        @click="onLinkClick"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
