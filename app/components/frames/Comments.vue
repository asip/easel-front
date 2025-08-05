<script setup lang="ts">
import type { Frame } from '~/interfaces'

const frame = defineModel<Frame>()

const commenter = useComment()
const { comment, getComments } = commenter

comment.value.frame_id = frame.value?.id
// console.log(comment.value.frame_id)

await getComments()

provide('commenter', commenter)
</script>

<template>
  <div class="pb-5">
    <FramesCommentList />
    <FramesCommentNewForm />
  </div>
</template>
