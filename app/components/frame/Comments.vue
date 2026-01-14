<script setup lang="ts">
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()

const { loggedIn } = useAccount()
const { getComments } = useComment()

const frameId = frame.value?.id
// console.log(frameId)

await getComments(frameId)

provide('frameId', frameId)
</script>

<template>
  <div>
    <FrameCommentList />
    <FrameCommentNewForm v-if="loggedIn" />
  </div>
</template>
