<script setup lang="ts">
const { closeModal } = useModal()
const { setFlash } = useToast()
const { loggedIn, deleteAccount, flash } = useAccount()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_account_modal')
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
