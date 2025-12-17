<script setup lang="ts">
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()

const { getComments } = useComment()

const frameId = frame.value?.id
// console.log(frameId)

await getComments(frameId)

provide('frameId', frameId)
</script>

<template>
  <div class="pb-5">
    <FrameCommentList />
    <FrameCommentNewForm />
  </div>
</template>
