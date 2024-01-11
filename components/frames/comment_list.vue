<template>
  <FramesComments />
  <FramesComment />
  <br>
</template>

<script setup lang="ts">
const commenter = useComment()
const { comment, getComments } = commenter
const { frame } = inject('framer') as any

provide('commenter', commenter)

comment.frame_id = frame?.id

// console.log(comment.frame_id);
await getComments()
</script>
