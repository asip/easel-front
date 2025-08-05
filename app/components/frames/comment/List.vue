<script setup lang="ts">
const { comments } = inject('commenter') as UseCommentType
</script>

<template>
  <div
    v-for="(comment, i) in comments"
    :key="comment.id"
  >
    <FramesCommentListItem v-model="comments[i]" />
  </div>
</template>
