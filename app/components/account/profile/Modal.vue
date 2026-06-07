<script setup lang="ts">
const { openModal, closeModal, isOutside } = useModal()
const { openPopover, available } = usePopover()
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
  if (available.value) {
    openPopover('#delete_account_popover')
  } else {
    openModal('#delete_account_modal')
    closeModal('#profile_modal')
  }
}

const onOutsideClick = (ev: PointerEvent): void => {
  if (isOutside(ev, '#profile_modal')) closeModal('#profile_modal')
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
        <button class="anchor-d-right-center" @click="onDeleteAccountClick">
          <i class="bi bi-x-circle text-accent hover:text-primary" />
        </button>
        {{ $t('model.user.model_name') }}
      </div>
      <AccountProfile />
      <ClientOnly>
        <AccountDeletePopover v-if="available" />
      </ClientOnly>
    </div>
  </dialog>
  <ClientOnly>
    <AccountDeleteModal v-if="!available" />
  </ClientOnly>
</template>
