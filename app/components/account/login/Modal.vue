<script lang="ts" setup>
const { googleClientID, loginByPassword } = useConfig()
const { loggedIn } = useAccount()
const { openModal, closeModal, isOutside } = useModal()

const form = useTemplateRef('form')

const onSignupClick = (): void => {
  form.value?.clearForm()
  closeModal('#login_modal')
  openModal('#signup_modal')
}

const onOutsideClick = (ev: PointerEvent): void => {
  if (isOutside(ev, '#login_modal')) {
    form.value?.clearForm()
    closeModal('#login_modal')
  }
}
</script>

<template>
  <dialog id="login_modal" class="modal" @click="onOutsideClick">
    <div class="modal-box rounded-[20px] divide-y divide-gray-200 glass">
      <div class="flex justify-start mb-1">
        <div>
          {{ $t('action.user.login') }}
        </div>
      </div>
      <div>
        <div class="flex justify-center border-0 gap-1 mb-1">
          <AccountLoginGoogle v-if="googleClientID && !loggedIn" />
          <button v-if="loginByPassword" class="btn btn-outline btn-primary" @click="onSignupClick">
            <i class="bi bi-person-plus-fill" />{{ $t('action.user.new') }}
          </button>
        </div>
        <div v-if="loginByPassword" class="flex justify-center border-0">
          <AccountLoginForm ref="form" />
        </div>
      </div>
    </div>
  </dialog>
</template>
