<script setup lang="ts">
const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { frame, deleteFrame, backendErrorInfo, set404Alert, isSuccess, flash, processing } = inject('framer') as UseFrameType

const onDeleteClick = async (): Promise<void> => {
  await deleteFrame()
  set404Alert()
  setFlash(flash.value)

  if (isSuccess()) {
    await navigateTo('/')
  } else {
    await redirect404()
  }
}

const redirect404 = async (): Promise<void> => {
  if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Frame') {
    await navigateTo('/')
  }
}
</script>

<template>
  <ConfirmModal
    v-if="loggedIn && frame?.user_id == loginUser.id"
    id="delete_frame_modal"
    :disabled="processing"
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
