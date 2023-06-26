<template>
  <div>
    <br>
    <form>
      <div class="card">
        <div class="card-block">
          <div class="row d-flex">
            <div class="col-12 clearfix">
              <div class="float-start">
                &nbsp;<NuxtLink :to="`/frames/${frame.id}`">
                  <i class="bi bi-arrow-left-circle" />
                </NuxtLink>
              </div>
            </div>
          </div>
          <br>
          <div class="card-block">
          <!-- render(partial: 'layouts/error_messages', locals: {model: @frame}) -->
          </div>
          <FramesPreviewImage :original="true" :photoswipe="false" />
          <!-- unless @frame.confirming == 'true' -->
          <FramesEditInput />
        <!-- else -->
        <!-- render(partial: 'frames/edit/confirm', locals: {form: form, frame: @frame}) -->
        <!-- end -->
        </div>
      </div>
      <br>
    </form>
  </div>
</template>

<script setup lang="ts">
// import { Frame } from '~/composables/use_frame';

const route = useRoute()
const { id } = route.params

const { logged_in, login_user } = useLoginUser()

const framer = useFrame()
const { frame, getFrame } = framer

await getFrame(id as string)

// console.log(frame.user_id)
// console.log(login_user.value.id)

// eslint-disable-next-line eqeqeq
if (!logged_in.value || frame.user_id != login_user.value.id) {
  await navigateTo(`/frames/${id}`)
}

provide('framer', framer)
</script>
