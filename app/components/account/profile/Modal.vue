<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { loggedIn, loginUser, setUser, initTimeZone } = inject('account') as UseAccountType

const onCloseClick = (): void => {
  closeModal('#profile_modal')
}

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
</script>

<template>
  <dialog v-if="loggedIn" id="profile_modal" class="modal">
    <div class="modal-box rounded-[20px] divide-y divide-gray-200">
      <div class="flex justify-start gap-1 pb-1 mb-1">
        <a href="#" @click.prevent="onCloseClick">
          <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
        </a>
        <a href="#" @click.prevent="onEditClick">
          <i class="bi bi-pencil-square text-accent hover:text-primary" />
        </a>
        <span v-if="loginUser && !loginUser.social_login">
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
