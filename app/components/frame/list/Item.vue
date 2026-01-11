<script lang="ts" setup>
import type { Frame } from '~/interfaces'

interface ImageInfo {
  width: number | undefined
  height: number | undefined
}

const frame = defineModel<Frame>()

const image = useTemplateRef('image')
const imageInfo = ref<ImageInfo>({ width: 0, height: 0 })

const { loggedIn, loginUser } = useAccount()
const { currentPage } = useFrameSearch()

const front = ref<boolean>(true)

const onLinkClick = () => {
  if(frame.value?.page) currentPage.value = frame.value?.page
}

const onFlipClick = (): void => {
  imageInfo.value.width = image.value?.width
  imageInfo.value.height = image.value?.height
  front.value = !front.value
}
</script>

<template>
  <div class="card-body">
    <div v-if="loggedIn && frame?.user_id == loginUser.id"  class="flex justify-start">
      <div class="badge badge-xs badge-outline badge-accent rounded-full">{{ $t(`enums.private.${frame?.private}`) }} </div>
    </div>
    <div v-show="front">
      <figure class="flex justify-center">
        <NuxtLink
          :to="`${frame?.file_url}`"
          class="w-full ps"
        >
          <img
            ref="image"
            :src="`${frame?.file_six_url}`"
            :alt="frame?.name"
            class="w-full h-auto"
          >
        </NuxtLink>
      </figure>
    </div>
    <ClientOnly>
      <div v-show="!front" class="flex items-center bg-blue-100" :style="`height: ${imageInfo.height}px;width: ${imageInfo.width}px;`">
        <div class="flex flex-col mx-auto">
          <div class="flex justify-center flex-wrap mb-1">
            <DisplayTags v-model="frame" :list="true" />
          </div>
          <div class="flex justify-center">
            <NuxtLink :to="`/users/${frame?.user_id}`">
              <div class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ frame?.user_name }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </ClientOnly>
    <div class="flex justify-center gap-1">
      <button
        v-if="front"
        type="button"
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-right-circle text-accent hover:text-primary" />
      </button>
      <button
        v-else
        type="button"
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
      </button>
      <NuxtLink
        :to="`/frames/${frame?.id}`"
        class="flex link link-hover"
        @click="onLinkClick"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
