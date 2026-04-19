<script setup lang="ts">
const { openModal, closeModal, checkOutside } = useModal()
const { loggedIn, account, setUser, initTimeZone } = inject('accountUse') as UseAccountType

const onEditClick = (): void => {
  closeModal('#profile_modal')
  setUser()
  initTimeZone()
  openModal('#edit_profile_modal')
}

const onEditPasswordClick = (): void => {
  closeModal('#profile_modal')
  setUser()
  openModal('#edit_password_modal')
}

const onDeleteAccountClick = (): void => {
  openModal('#delete_account_modal')
  closeModal('#profile_modal')
}

const onOutsideClick = (e: PointerEvent): void => {
  const { isOutside, modalEl } = checkOutside(e, '#profile_modal')
  if (isOutside) {
    modalEl?.close()
  }
}
</script>

<template>
  <dialog v-if="loggedIn" id="profile_modal" class="modal" @click="onOutsideClick">
    <div class="modal-box rounded-[20px] divide-y divide-gray-200 glass text-white">
      <div class="flex justify-start gap-1 pb-1 mb-1">
        <a href="#" @click.prevent="onEditClick">
          <i class="bi bi-pencil-square text-accent hover:text-primary" />
        </a>
        <span v-if="account && !account.social_login">
          <a href="#" @click.prevent="onEditPasswordClick">
            <i class="bi bi-lock text-accent hover:text-primary" />
          </a>
        </span>
        <a href="#" @click.prevent="onDeleteAccountClick">
          <i class="bi bi-x-circle text-accent hover:text-primary" />
        </a>
        {{ $t('model.user.model_name') }}
      </div>
      <AccountProfile />
    </div>
  </dialog>
  <AccountDeleteModal />
</template>
