<script setup lang="ts">
const { openModal } = useModal()

const route = useRoute()
const { id } = route.params
const frameId = id?.toString()

const { loggedIn } = useAccount()
const frameUse = useFrame()
const { frame, getFrame } = frameUse

provide('frameUse', frameUse)

await getFrame(`${frameId}`)

const onNameClick = (): void => {
  openModal('#frame_profile_modal')
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div
        class="card bg-base-100 shadow rounded-[20px] pt-1 pb-1 pl-4 pr-4 mt-2 mb-2 w-full sm:w-3/4"
      >
        <NuxtLink class="flex justify-center hover:text-primary link" @click="onNameClick">
          {{ frame?.name }}
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2 w-full sm:w-3/4">
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
