<script setup lang="ts">
const route = useRoute()
const q = route.query.q
const page = route.query.page

const { frameQuery } = useFrameSearch()

if (q) {
  frameQuery.value.word = q as string
}
if (page) {
  frameQuery.value.page = Number.parseInt(page as string)
} else {
  frameQuery.value.page = null
}
</script>

<template>
  <div>
    <br>
    <FramesList />
  </div>
</template>
