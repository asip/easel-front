<script setup lang="ts">
const route = useRoute()
const q = route.query.q
const page = route.query.page
const items = q ? JSON.parse(q.toString()) : {}

const { frameQuery } = useFrameSearch()

if (q) {
  frameQuery.value.items.word = items.word
}
if (page) {
  frameQuery.value.page = Number.parseInt(page.toString())
} else {
  frameQuery.value.page = 1
}
</script>

<template>
  <div>
    <br>
    <FramesList />
  </div>
</template>
