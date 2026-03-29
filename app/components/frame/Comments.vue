<script setup lang="ts">
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()

const { getComments } = useComments()

const frameId = frame.value?.id
// console.log(frameId)

await getComments(frameId)
</script>

<template>
  <div>
    <FrameCommentList />
    <FrameCommentNewForm :frame-id="frameId" />
  </div>
</template>
