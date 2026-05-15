<script setup lang="ts">
const router = useRouter()

const { frameQuery, queryMap, frames, current, prev, next, pagePrev, pageNext, minPage, maxPage } =
  useFrameSearch()

// console.log('searchFrame: start')
await current()
router.push({ path: '/', query: queryMap.value })

const onPrevClick = async (): Promise<void> => {
  await prev()
}

const onNextClick = async (): Promise<void> => {
  await next()
}
</script>

<template>
  <FrameListPrev
    v-if="pagePrev"
    :min-page="minPage"
    :pages="frameQuery.pages"
    @click="onPrevClick"
  />

  <FrameListCurrent v-model="frames" />

  <FrameListNext
    v-if="pageNext"
    :max-page="maxPage"
    :pages="frameQuery.pages"
    @click="onNextClick"
  />
</template>
