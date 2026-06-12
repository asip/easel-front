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
      <div class="flex justify-between gap-1 mb-1">
        <div>{{ $t('model.user.model_name') }}</div>
        <div>
          <a href="#" @click.prevent="onEditClick">
            <i class="icon-pencil text-accent hover:text-primary" />
          </a>
          <span v-if="account && !account.social_login">
            <a href="#" @click.prevent="onEditPasswordClick">
              <i class="icon-key-round text-accent hover:text-primary" />
            </a>
          </span>
          <button class="anchor-d-left-center" @click="onDeleteAccountClick">
            <i class="icon-circle-x text-accent hover:text-primary" />
          </button>
        </div>
      </div>
      <AccountProfile />
    </div>
    <ClientOnly>
      <AccountDeletePopover v-if="available" />
    </ClientOnly>
  </dialog>
  <ClientOnly>
    <AccountDeleteModal v-if="!available" />
  </ClientOnly>
</template>
