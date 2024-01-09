<template>
  <ConfirmModal
    id="delete_modal"
    @click="onDeleteClick"
  >
    <template #message>
      {{ $t('action.modal.user.delete.message') }}
    </template>
    <template #label>
      {{ $t('action.user.delete') }}
    </template>
  </ConfirmModal>
</template>

<script setup lang="ts">
import { useModal } from '~/composables/ui/use_modal'
import { useToast } from '~/composables/ui/use_toast'

const { closeModal } = useModal()
const { setFlash } = useToast()
const { deleteAccount, flash } = useLoginUser()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_modal')
}
</script>
