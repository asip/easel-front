<script setup lang="ts">
// import type { Frame } from '~/interfaces/frame';

const route = useRoute()
const { id } = route.params
const frameId = id as string

const framer = useFrame()
const { frame, getFrame } = framer

const { refresh } = await getFrame(frameId)

framer.refresh = async () => { await refresh() }

provide('framer', framer)
</script>

<template>
  <div>
    <br>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow shadow-sm rounded-[20px] ml-2 mr-2 mb-2 w-full sm:w-3/4">
        <div class="card-body">
          <div class="flex justify-start">
            <NuxtLink :to="`/frames/${frame.id}`">
              <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
            </NuxtLink>
          </div>
          <FramesPreviewImage
            v-model="frame"
            :original="true"
            :photoswipe="false"
          />
          <!-- unless @frame.confirming == 'true' -->
          <FramesEditForm />
          <!-- else -->
          <!-- render(partial: 'frames/edit/confirm', locals: {form: form, frame: @frame}) -->
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>
