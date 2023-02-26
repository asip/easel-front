<template>
  <FramesComment />
  <br>
  <FramesComments />
  <br>
</template>

<script setup lang="ts">
  import { Frame } from '~/composables/use_frame'

  const commenter = useComment();
  const { comment, getComments } = commenter
  const frame: Frame | undefined = inject('frame')

  provide('commenter', commenter)

  comment.frame_id = frame?.id

  //console.log(comment.frame_id);
  await getComments()
</script>
