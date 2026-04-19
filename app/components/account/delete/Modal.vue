<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { setFlash } = useSonner()
const { loggedIn, deleteAccount, flash, processing } = useAccount()

const onDeleteClick = async (): Promise<void> => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_account_modal')
}

const onCloseClick = (): void => {
  closeModal('#delete_account_modal')
  openModal('#profile_modal')
}
</script>

<template>
  <ConfirmModal
    v-if="loggedIn"
    id="delete_account_modal"
    :disabled="processing"
    @click="onDeleteClick"
    @click-close="onCloseClick"
  >
    <template #message>
      {{ $t('action.modal.user.delete.message') }}
    </template>
    <template #label>
      {{ $t('action.user.delete') }}
    </template>
  </ConfirmModal>
</template>
