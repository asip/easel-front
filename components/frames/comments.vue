<template>
  <FramesCommentList />
  <FramesCommentNewForm />
  <br>
</template>

<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'

const modelValue = defineModel<Frame>()

const commenter = useComment()
const { comment } = commenter

comment.value.frame_id = modelValue.value?.id
provide('commenter', commenter)
</script>
