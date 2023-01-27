<template>
  <FramesComment @change="updateComments" />
  <br>
  <FramesComments @change="updateComments" />
  <br>
</template>

<script setup lang="ts">
  import { Frame } from '~/composables/use_frame'

  const { comment, comments, getComments } = useComment();
  const frame: Frame | undefined = inject('frame')

  provide('comments', comments)

  comment.frame_id = frame?.id

  const updateComments = async () => {
    comments.splice(0, comments.length);
    await getComments()
  }

  onBeforeMount(async () => {
    //console.log(comment.frame_id);
    await getComments();
  })
</script>
