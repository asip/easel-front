<template>
  <ConfirmModal
    id="delete_modal"
    :message="$t('action.modal.user.delete.message')"
    :label="$t('action.user.delete')"
    @click="onDeleteClick"
  />
</template>

<script setup lang="ts">
import { useModal } from '~/composables/ui/use_modal'
import { useToast } from '~/composables/ui/use_toast'

const { removeBackdrop } = useModal()
const { setFlash } = useToast()
const { logged_in, deleteAccount, flash } = useLoginUser()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  removeBackdrop()
  if (!logged_in.value) {
    navigateTo('/login')
  }
}
</script>
