<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { loggedIn } = inject('account') as UseAccountType

const form = useTemplateRef('form')

const onBackClick = () => {
  form.value?.clearForm()
  closeModal('#edit_profile_modal')
  openModal('#profile_modal')
}
</script>

<template>
  <dialog
    v-if="loggedIn"
    id="edit_profile_modal"
    class="modal"
  >
    <div
      class="modal-box rounded-[20px] divide-y divide-gray-200"
    >
      <div class="flex justify-start pb-1 mb-2">
        <a
          href="#"
          class="mr-1"
          @click.prevent="onBackClick"
        >
          <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
        </a>
        {{ $t('action.user.edit') }}
      </div>
      <div class="flex justify-center border border-white">
        <UsersEditForm ref="form" />
      </div>
    </div>
  </dialog>
</template>
