<template>
  <div v-if="logged_in && frame?.user_id == login_user.id" class="modal fade" id="delete_modal" tabindex="-1"
       role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ $t('action.modal.delete.message') }}
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-danger" @click="onDeleteClick">{{ $t('action.model.delete') }}</button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">{{ $t('action.modal.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {Frame} from "~/composables/use_frame";

  const { logged_in, login_user } = useLoginUser()
  const { deleteFrame, setFrame } = useFrame()

  const frame: Frame | undefined = inject('frame')

  const removeBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop')
    backdrop?.remove()
  }

  const onDeleteClick = async () => {
    setFrame(frame)
    await deleteFrame()
    removeBackdrop()
    navigateTo('/')
  }
</script>