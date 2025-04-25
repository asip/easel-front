<script setup lang="ts">
const route = useRoute()
const q = route.query.q
const page = route.query.page

const { frame_query } = useFrameSearch()

if (q) {
  frame_query.value.word = q as string
}
if (page) {
  frame_query.value.page = Number.parseInt(page as string)
} else {
  frame_query.value.page = null
}
</script>

<template>
  <div>
    <br>
    <FramesList />
  </div>
</template>
