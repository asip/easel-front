<script setup lang="ts">
const route = useRoute()
const { id } = route.params
const frameId = id?.toString()

const { loggedIn } = useAccount()
const framer = useFrame()
const { frame, getFrame } = framer

provide('framer', framer)

await getFrame(`${frameId}`)
</script>

<template>
  <div>
    <br >
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
        <div class="card-body">
          <FrameDetail v-model="frame" />
        </div>
      </div>
    </div>
    <FrameDeleteModal v-if="loggedIn" />
    <FrameComments v-model="frame" />
  </div>
</template>

<style>
.btn-icon-local {
  padding: 0;
  background: none;
  border: none;
}
</style>
