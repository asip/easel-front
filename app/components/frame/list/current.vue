<script lang="ts" setup>
import type { Frame } from '~/types'

const model = defineModel<Frame[]>()

const { initGallery, closeGallery } = useImageGallery({ selector: '.lb', anchor: 'a.ps' })

const frames = computed(() => model.value ?? [])

onMounted(() => {
  initGallery()
})

onUpdated(() => {
  initGallery()
})

onUnmounted(() => {
  closeGallery()
})
</script>

<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10 lb mt-2">
      <div
        v-for="(frame, i) in frames"
        :key="frame.id"
        class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2"
      >
        <FrameListItem v-model="frames[i]" />
      </div>
    </div>
  </div>
</template>
