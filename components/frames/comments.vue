<template>
  <FramesCommentList :frame="frame" />
  <FramesCommentNewForm :frame="frame" />
  <br>
</template>

<script setup lang="ts">
import type { Frame } from '~/interfaces/frame';

const props = defineProps<{
  frame: Frame
}>()

const commenter = useComment()
const { comment } = commenter

comment.frame_id = props.frame.id
provide('commenter', commenter)
</script>
