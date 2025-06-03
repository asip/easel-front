<script setup lang="ts">
const framer = useFrame()

provide('framer', framer)
</script>

<template>
  <div>
    <br>
    <div class="card col-sm-8 mx-auto kadomaru-20">
      <div class="card-header bg-color-white">
        <div class="float-start">
          <NuxtLink to="/">
            <i class="bi bi-arrow-left-circle" />
          </NuxtLink>
          {{ $t('action.frame.upload') }}
        </div>
      </div>
      <!-- unless @frame.confirming == 'true' -->
      <FramesNewForm />
      <!-- else -->
      <!-- render(partial: 'frames/new/confirm', locals: {form: form, frame: @frame}) -->
      <!-- end -->
    </div>
  </div>
</template>
