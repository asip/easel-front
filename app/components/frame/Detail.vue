<script setup lang="ts">
import type { Frame } from '~/types'

const { loggedIn, account } = useAccount()

const frame = defineModel<Frame>()
</script>

<template>
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
