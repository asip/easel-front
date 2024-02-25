<template>
  <div v-for="(comment, i) in comments as Comment[]" :key="comment.id">
    <FramesCommentItem v-model="comments[i]" />
  </div>
</template>

<script setup lang="ts">
import type { UseCommentType } from '~/composables/use_comment'
import type { Comment } from '~/interfaces/comment'

const { comments, getComments } = inject('commenter') as UseCommentType

// console.log(comment.frame_id);
await getComments()
</script>
