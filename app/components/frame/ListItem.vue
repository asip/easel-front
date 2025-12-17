<script lang="ts" setup>
import type { Frame } from '~/interfaces'

const front = ref<boolean>(true)
const frame = defineModel<Frame>()

const image = useTemplateRef('image')
const imageHeight = ref<number | undefined>(0)

const { loggedIn, loginUser } = useAccount()

const onFlipClick = (): void => {
  imageHeight.value = image.value?.height
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
          class="lb w-full"
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
      <div v-show="!front" class="flex items-center" :style="`height: ${imageHeight}px`">
        <div class="flex flex-col mx-auto">
          <div class="flex justify-center flex-wrap mb-1">
            <PreviewTags v-model="frame" :list="true" />
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
        class=""
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-right-circle text-accent hover:text-primary" />
      </button>
      <button
        v-else
        type="button"
        class=""
        @click="onFlipClick"
      >
        <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
      </button>
      <NuxtLink
        :to="`/frames/${frame?.id}`"
        class="flex link link-hover"
      >
        {{ frame?.name }}
      </NuxtLink>
    </div>
  </div>
</template>
