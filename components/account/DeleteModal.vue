<script setup lang="ts">
import { useModal } from '~/composables/ui/use_modal'
import { useToast } from '~/composables/ui/use_toast'

const { closeModal } = useModal()
const { setFlash } = useToast()
const { logged_in, deleteAccount, flash } = useLoginUser()

const onDeleteClick = async () => {
  await deleteAccount()
  setFlash(flash.value)
  closeModal('#delete_account_modal')
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
