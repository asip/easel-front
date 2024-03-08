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
const { id } = route.params

const { logged_in, login_user } = useLoginUser()

const framer = useFrame()
const { frame, getFrame } = framer

await getFrame(id as string)

// eslint-disable-next-line eqeqeq
if (!logged_in.value || frame.value.user_id != login_user.value.id) {
  await navigateTo(`/frames/${id}`)
}

// console.log(frame.user_id)
// console.log(login_user.value.id)

provide('framer', framer)
</script>
