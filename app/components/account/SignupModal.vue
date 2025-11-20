<script setup lang="ts">
const { openModal, closeModal } = useModal()

const form = useTemplateRef('form')

const onBackClick = (): void => {
  form.value?.clearForm()
  closeModal('#signup_modal')
  openModal('#login_modal')
}
</script>

<template>
  <dialog
    id="signup_modal"
    class="modal"
  >
    <div class="modal-box rounded-[20px] divide-y divide-gray-200">
      <div class="flex justify-start mb-2">
        <a
          href="#"
          class="mr-1"
          @click.prevent="onBackClick"
        >
          <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
        </a>
        {{ $t('action.user.new') }}
      </div>
      <div>
        <UsersNewForm ref="form" />
      </div>
    </div>
  </dialog>
</template>
