<template>
  <br>
  <div>
    <form>
      <div class="card">
        <div class="card-header">
          <div class="float-start">
            <NuxtLink to="/"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
            アップロード
          </div>
        </div>
        <br>

        <!-- unless @frame.confirming == 'true' -->
        <FramesNewInput />
        <!-- else -->
        <!-- render(partial: 'frames/new/confirm', locals: {form: form, frame: @frame}) -->
        <!-- end -->
      </div>
      <br>
    </form>
  </div>
</template>

<script setup lang="ts">

  const { logged_in } = useLoginUser()
  const { frame } = useFrame()

  if(!logged_in.value ){
    await navigateTo('/')
  }

  provide('frame', frame)
</script>