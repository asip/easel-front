<script setup lang="ts">
import type { Frame, RefQueryItems } from '~/types'

const { redirectTo } = usePrevPage()
const { queryMap } = useFrameSearch()
const { loggedIn, account } = useAccount()
const { openModal } = useModal()

const route = useRoute()

const { refItems, refMap } = useCookieStore()

const frame = defineModel<Frame>()

const queryMapWithRef = computed<RefQueryItems>(() => ({ ref: JSON.stringify({ from: 'frame' }) }))

const onPageBack = async (): Promise<void> => {
  if (!refMap.value.from) {
    await navigateTo({ path: '/', query: queryMap.value })
  } else {
    await redirectTo({ current: route.path, fallback: '/' })
  }
}

const onUserNameClick = async (): Promise<void> => {
  refItems.value = queryMapWithRef.value.ref
  await navigateTo({ path: `/users/${frame.value?.user_id}` })
}

const onDeleteClick = (): void => {
  openModal('#delete_frame_modal')
}
</script>

<template>
  <div class="flex justify-between">
    <div class="flex gap-1">
      <span @click="onPageBack">
        <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
      </span>
      <NuxtLink v-if="loggedIn && frame?.user_id == account.id" :to="`/frames/${frame?.id}/edit`">
        <i class="bi bi-pencil-square text-accent hover:text-primary" />
      </NuxtLink>
      <!-- Button trigger modal -->
      <button
        v-if="loggedIn && frame?.user_id == account.id"
        type="button"
        class="btn-icon-local"
        @click="onDeleteClick"
      >
        <i class="bi bi-x-circle text-accent hover:text-primary" />
      </button>
    </div>
    <div>
      <NuxtLink class="link link-hover" @click="onUserNameClick">
        {{ frame?.user_name }}
      </NuxtLink>
    </div>
  </div>
  <div class="flex justify-center mb-1">
    <DisplayImage v-model="frame" :original="true" :photoswipe="true" />
  </div>
  <div class="flex justify-center flex-wrap mb-1">
    <div
      v-if="loggedIn && frame?.user_id == account.id"
      class="badge badge-outline badge-accent truncate rounded-full"
    >
      {{ $t(`enums.private.${frame?.private}`) }}
    </div>
    <DisplayTags v-model="frame" />
  </div>
  <FrameProfileModal v-model="frame" />
</template>
