<script setup lang="ts">
import { useModal } from '~/composables/ui/use-modal'
import { useToast } from '~/composables/ui/use-toast'
import type { UseFrameType } from '~/composables/use-frame'

const { removeBackdrop } = useModal()
const { setFlash } = useToast()
const { logged_in, login_user } = useLoginUser()
const { frame, deleteFrame, isSuccess, flash } = inject('framer') as UseFrameType

const onDeleteClick = async () => {
  await deleteFrame()
  setFlash(flash.value)
  removeBackdrop()
  if (isSuccess()) {
    await navigateTo('/')
  }
}
</script>

<template>
  <ConfirmModal
    v-if="logged_in && frame?.user_id == login_user.id"
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
