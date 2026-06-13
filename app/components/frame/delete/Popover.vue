<script setup lang="ts">
const { setFlash } = useSonner()
const { loggedIn, account } = useAccount()
const { frame, deleteFrame, backendErrorInfo, set404Alert, success, flash, processing } = inject(
  'frameUse',
) as UseFrameType

const onDeleteClick = async (): Promise<void> => {
  await deleteFrame()
  set404Alert()
  setFlash(flash.value)

  if (success) {
    await navigateTo('/')
  } else {
    await redirect404()
  }
}

const redirect404 = async (): Promise<void> => {
  if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.error?.source == 'Frame') {
    await navigateTo('/')
  }
}
</script>

<template>
  <ConfirmPopover
    v-if="loggedIn && frame?.user_id == account.id"
    id="delete_frame_popover"
    popover-class="popover-right-center pointer-events-auto rounded-[10px] ml-1"
    :disabled="processing"
    @click="onDeleteClick"
  >
    <template #message>
      {{ $t('action.modal.delete.message') }}
    </template>
    <template #label>
      {{ $t('action.model.delete') }}
    </template>
  </ConfirmPopover>
</template>
