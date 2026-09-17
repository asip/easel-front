<script setup lang="ts">
const router = useRouter()

const { frameQuery, query, frames, current, prev, next, prevPage, nextPage, minPage, maxPage } =
  useFrameSearch()

// console.log('searchFrame: start')
await current()
router.push({ path: '/', query: query.value })

const onPrevClick = async (): Promise<void> => {
  await prev()
}

const onNextClick = async (): Promise<void> => {
  await next()
}
</script>

<template>
  <FrameListPrev
    v-if="prevPage"
    :min-page="minPage"
    :pages="frameQuery.pages"
    @click="onPrevClick"
  />

  <FrameListCurrent v-model="frames" />

  <FrameListNext
    v-if="nextPage"
    :max-page="maxPage"
    :pages="frameQuery.pages"
    @click="onNextClick"
  />
</template>
