<script lang="ts" setup>
const { loggedIn } = useAccount()
const { closeModal, openModal } = useModal()
const { resetLoginParams } = inject('accounter') as useAccountType

const form = useTemplateRef('form')

const onSignupClick = () => {
  closeModal('#login_modal')
  resetLoginParams()
  openModal('#signup_modal')
}

const onCloseClick = () => {
  form?.value.onCloseClick()
}
</script>

<template>
  <dialog
    id="login_modal"
    class="modal"
  >
    <div
      class="modal-box rounded-[20px] divide-y divide-gray-200"
    >
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="onCloseClick">✕</button>
      <div class="flex justify-start mb-1">
        {{ $t('action.user.login') }}
      </div>
      <div>
      <div class="flex justify-center border border-white gap-1 mb-1">
        <AccountLoginGoogle v-if="!loggedIn" />
        <button
          class="btn btn-outline btn-primary"
          @click="onSignupClick"
        >
          <i class="bi bi-person-plus-fill" />{{ $t('action.user.new') }}
        </button>
      </div>
      <div class="flex justify-center border border-white">
        <AccountLoginForm ref="form" />
      </div>
    </div>
    </div>
  </dialog>
</template>
