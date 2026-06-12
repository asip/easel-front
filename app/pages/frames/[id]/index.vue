<script setup lang="ts">
import { usePopover } from '~/composables/ui/use-popover'
import type { RefQueryItems } from '~/types'

const { openModal } = useModal()
const { openPopover, available } = usePopover()

const route = useRoute()
const { id } = route.params
const frameId = id?.toString()

const { loggedIn, account } = useAccount()
const frameUse = useFrame()
const { frame, getFrame } = frameUse

const { redirectTo } = usePrevPage()
const { current, queryMap } = useFrameSearch()

const { refItems, refMap } = useCookieStore()

provide('frameUse', frameUse)

await getFrame(`${frameId}`)

const queryMapWithRef = computed<RefQueryItems>(() => ({ ref: JSON.stringify({ from: 'frame' }) }))

const onPageBack = async (): Promise<void> => {
  if (!refMap.value.from) {
    await current({ cache: false })
    await navigateTo({ path: '/', query: queryMap.value })
  } else {
    await redirectTo({ current: route.path, fallback: '/' })
  }
}

const onNameClick = (): void => {
  openModal('#frame_profile_modal')
}

const onUserNameClick = async (): Promise<void> => {
  refItems.value = queryMapWithRef.value.ref
  await navigateTo({ path: `/users/${frame.value?.user_id}` })
}

const onDeleteClick = (): void => {
  if (available.value) {
    openPopover('#delete_frame_popover')
  } else {
    openModal('#delete_frame_modal')
  }
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2 mb-2 w-full sm:w-3/4">
        <div class="relative">
          <div class="flex justify-between items-center pl-4 pr-4 pt-1 pb-1">
            <div class="flex gap-1 curspr-poineter z-0">
              <span @click="onPageBack">
                <i class="icon-circle-chevron-left text-accent hover:text-primary" />
              </span>
              <NuxtLink
                v-if="loggedIn && frame?.user_id == account.id"
                :to="`/frames/${frame?.id}/edit`"
              >
                <i class="icon-pencil text-accent hover:text-primary" />
              </NuxtLink>
              <!-- Button trigger modal -->
              <button
                v-if="loggedIn && frame?.user_id == account.id"
                type="button"
                class="btn-icon-local anchor-right-center"
                @click="onDeleteClick"
              >
                <i class="icon-circle-x text-accent hover:text-primary" />
              </button>
            </div>
            <div class="curspr-poineter z-0">
              <NuxtLink class="link link-hover" @click="onUserNameClick">
                {{ frame?.user_name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-0 bg-opacity-0 flex justify-center items-center z-10 pointer-events-none"
        >
          <NuxtLink
            class="flex justify-center hover:text-primary link pt-1 pb-1 pointer-events-auto"
            @click="onNameClick"
          >
            {{ frame?.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2 w-full sm:w-3/4">
        <div class="card-body">
          <FrameDetail v-model="frame" />
        </div>
      </div>
    </div>
    <ClientOnly>
      <FrameDeletePopover v-if="available" />
      <FrameDeleteModal v-if="!available" />
    </ClientOnly>
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
