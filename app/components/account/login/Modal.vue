<script lang="ts" setup>
const { googleClientID } = useConstants()
const { loggedIn } = useAccount()
const { openModal, closeModal, checkOutside } = useModal()

const form = useTemplateRef('form')

const onSignupClick = (): void => {
  form.value?.clearForm()
  closeModal('#login_modal')
  openModal('#signup_modal')
}

const onOutsideClick = (e: PointerEvent): void => {
  const { isOutside, modalEl } = checkOutside(e, '#login_modal')
  if (isOutside) {
    form.value?.clearForm()
    modalEl?.close()
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
          <button class="btn btn-outline btn-primary" @click="onSignupClick">
            <i class="bi bi-person-plus-fill" />{{ $t('action.user.new') }}
          </button>
        </div>
        <div class="flex justify-center border-0">
          <AccountLoginForm ref="form" />
        </div>
      </div>
    </div>
  </dialog>
</template>
