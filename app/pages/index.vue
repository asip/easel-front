<script setup lang="ts">
const route = useRoute()
const q = route.query.q
const page = route.query.page
const items = q ? JSON.parse(q.toString()) : {}

const { frameQuery } = useFrameSearch()

if (q) {
  frameQuery.value.items.word = items.word
  frameQuery.value.items.frame_name = items.frame_name
  frameQuery.value.items.tag_name = items.tag_name
  frameQuery.value.items.user_name = items.user_name
  frameQuery.value.items.creator_name = items.creator_nam
  frameQuery.value.items.date = items.date
}
if (page) {
  frameQuery.value.page = Number.parseInt(page.toString())
} else {
  frameQuery.value.page = 1
}
</script>

<template>
  <div>
    <br />
    <FrameList />
  </div>
</template>
