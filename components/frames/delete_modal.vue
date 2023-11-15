<template>
  <ConfirmModal
    v-if="logged_in && frame?.user_id == login_user.id"
    id="delete_modal"
    :message="$t('action.modal.delete.message')"
    :label="$t('action.model.delete')"
    @click="onDeleteClick"
  />
</template>

<script setup lang="ts">

const { logged_in, login_user } = useLoginUser()
const { frame, deleteFrame, isSuccess } = inject('framer') as any

const removeBackdrop = () => {
  const backdrop = document.querySelector('.modal-backdrop')
  backdrop?.remove()
}

const onDeleteClick = async () => {
  await deleteFrame()
  removeBackdrop()
  if(isSuccess()){
    navigateTo('/')
  } else {
    if(!login_user.value.id){
      navigateTo('/')
    }
  }
}
</script>
