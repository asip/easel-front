<script setup lang="ts">
const framer = useFrame()

provide('framer', framer)
</script>

<template>
  <div>
    <br>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2 w-full sm:w-3/4">
        <div class="card-body divide-y divide-gray-200">
          <div class="flex justify-start gap-1">
            <NuxtLink to="/">
              <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
            </NuxtLink>
            {{ $t('action.frame.upload') }}
          </div>
          <!-- unless @frame.confirming == 'true' -->
          <FramesNewForm />
          <!-- else -->
          <!-- render(partial: 'frames/new/confirm', locals: {form: form, frame: @frame}) -->
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>
