<script setup lang="ts">
const { closeModal, removeBackdrop } = useModal()
const { setFlash } = useToast()
const { logged_in, deleteAccount, flash } = useLoginUser()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_account_modal')
  removeBackdrop()
}
</script>

<template>
  <ConfirmModal
    v-if="logged_in"
    id="delete_account_modal"
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
