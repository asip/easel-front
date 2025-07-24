<script setup lang="ts">
import type { UseFrameType } from '~/composables/use-frame'

const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { frame, deleteFrame, isSuccess, flash } = inject('framer') as UseFrameType

const onDeleteClick = async () => {
  await deleteFrame()
  setFlash(flash.value)

  if (isSuccess()) {
    await navigateTo('/')
  }
}
</script>

<template>
  <ConfirmModal
    v-if="loggedIn && frame?.user_id == loginUser.id"
    id="delete_frame_modal"
    @click="onDeleteClick"
  >
    <template #message>
      {{ $t('action.modal.delete.message') }}
    </template>
    <template #label>
      {{ $t('action.model.delete') }}
    </template>
  </ConfirmModal>
</template>
