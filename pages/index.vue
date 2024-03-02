<template>
  <div>
    <br>
    <FramesList />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const q = route.query.q

const { frame_query } = useFrameSearch()

if (q) {
  frame_query.value.word = q as string
}
</script>
