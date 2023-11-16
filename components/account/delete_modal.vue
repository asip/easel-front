<template>
  <ConfirmModal
    id="delete_modal"
    :message="$t('action.modal.user.delete.message')"
    :label="$t('action.user.delete')"
    @click="onDeleteClick"
  />
</template>

<script setup lang="ts">

const { setFlash } = useToast()
const { login_user, deleteAccount, flash } = useLoginUser()

const removeBackdrop = () => {
  const backdrop = document.querySelector('.modal-backdrop')
  backdrop?.remove()
}

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  removeBackdrop()
  if (!login_user.value.id) {
    navigateTo('/')
  }
}
</script>
