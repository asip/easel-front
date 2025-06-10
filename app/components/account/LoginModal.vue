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
      <div class="flex justify-between mb-1">
        <div>
        {{ $t('action.user.login') }}
        </div>
        <div/>
        <a href="#" @click.prevent="onCloseClick">
          <i class="bi bi-x-circle text-accent hover:text-primary" />
        </a>
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
