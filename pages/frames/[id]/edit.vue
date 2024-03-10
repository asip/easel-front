<template>
  <div>
    <br>
    <div class="card col-sm-8 mx-auto">
      <div class="card-block">
        <div class="row d-flex">
          <div class="clearfix">
            <div class="float-start">
              &nbsp;<NuxtLink :to="`/frames/${frame.id}`">
                <i class="bi bi-arrow-left-circle" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <br>
      <FramesPreviewImage v-model="frame" :original="true" :photoswipe="false" />
      <!-- unless @frame.confirming == 'true' -->
      <FramesEditForm />
      <!-- else -->
      <!-- render(partial: 'frames/edit/confirm', locals: {form: form, frame: @frame}) -->
      <!-- end -->
    </div>
    <br>
  </div>
</template>

<script setup lang="ts">
// import type { Frame } from '~/interfaces/frame';

const route = useRoute()
const frame_id = route.params.id as string

const framer = useFrame()
const { frame, getFrame } = framer

await getFrame(frame_id)

provide('framer', framer)
</script>
