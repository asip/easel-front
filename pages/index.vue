<template>
  <br>
  <div class="row col-sm-12">
      <div v-for="frame in frames" class="card col-sm-3 kadomaru">
        <NuxtLink :to="`/`" class="mx-auto" style="padding-top: 10px;"><img :src="frame.attributes.file_two_url" class="card-img-top" /></NuxtLink>
        <br>
        <div class="card-block">
          <div class="d-flex justify-content-sm-center">
            <div class="mx-auto" style="padding-bottom: 10px;">
              <NuxtLink :to="`/`" class="mx-auto">{{frame.attributes.name}}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
  const { frames, searchFrame } = useFrameSearch()

  onMounted(async () => {
    //await searchFrame()
  })
</script>