<script setup lang="ts">
const { comments } = useComment()
</script>

<template>
  <div
    v-for="(comment, i) in comments"
    :key="comment.id"
  >
    <FramesCommentListItem v-model="comments[i]" />
  </div>
</template>
