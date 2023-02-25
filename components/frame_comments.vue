<template>
  <FramesComment />
  <br>
  <FramesComments />
  <br>
</template>

<script setup lang="ts">
  import { Frame } from '~/composables/use_frame'

  const commenter = useComment();
  const frame: Frame | undefined = inject('frame')

  provide('commenter', commenter)

  commenter.comment.frame_id = frame?.id

  //console.log(comment.frame_id);
  await commenter.getComments()

  const updateComments = async () => {
    commenter.comments.splice(0, commenter.comments.length);
    await commenter.getComments()
  }
</script>
