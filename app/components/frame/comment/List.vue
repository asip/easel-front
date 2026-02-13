<script setup lang="ts">
const { comments } = useComments()
</script>

<template>
  <div v-for="(comment, i) in comments" :key="comment.id">
    <FrameCommentListItem v-model="comments[i]" />
  </div>
</template>
