<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'

const frame = defineModel<Frame>()

const commenter = useComment()
const { comment } = commenter

comment.value.frame_id = frame.value?.id
provide('commenter', commenter)
</script>

<template>
  <div class="pb-5">
    <FramesCommentList />
    <FramesCommentNewForm />
  </div>
</template>
