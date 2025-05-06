<script setup lang="ts">
const { closeModal, removeBackdrop } = useModal()
const { setFlash } = useToast()
const { loggedIn, deleteAccount, flash } = useAccount()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_account_modal')
  removeBackdrop()
}
</script>

<template>
  <ConfirmModal
    v-if="loggedIn"
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
