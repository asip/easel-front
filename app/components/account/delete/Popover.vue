<script setup lang="ts">
const { closeModal } = useModal()
const { closePopover } = usePopover()
const { setFlash } = useSonner()
const { loggedIn, deleteAccount, flash, processing } = useAccount()

const onDeleteClick = async (): Promise<void> => {
  await deleteAccount()
  setFlash(flash.value)
  closePopover('#delete_account_popover')
  closeModal('#profile_modal')
}
</script>

<template>
  <ConfirmPopover
    v-if="loggedIn"
    id="delete_account_popover"
    popover-class="popover-d-left-center rounded-[10px] mr-1"
    :disabled="processing"
    @click="onDeleteClick"
  >
    <template #message>
      {{ $t('action.modal.user.delete.message') }}
    </template>
    <template #label>
      {{ $t('action.user.delete') }}
    </template>
  </ConfirmPopover>
</template>
