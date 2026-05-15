<script setup lang="ts">
const route = useRoute()
const q = route.query.q?.toString()
const page = route.query.page?.toString()

const { initFrameQuery } = useFrameSearch()

initFrameQuery(q, page)
</script>

<template>
  <div>
    <FrameList />
  </div>
</template>
