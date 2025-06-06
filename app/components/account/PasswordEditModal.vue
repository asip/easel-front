<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { loggedIn, loginUser, setUser } = inject('accounter') as useAccountType

const onBackClick = () => {
  closeModal('#edit_password_modal')
  openModal('#profile_modal')
}

onMounted(() => {
  setUser(loginUser)
})
</script>

<template>
  <dialog
    v-if="loggedIn && loginUser && !loginUser.social_login"
    id="edit_password_modal"
    class="modal"
  >
    <div
      class="modal-box rounded-[20px] divide-y divide-gray-200"
    >
      <div class="flex justify-start mb-2">
        <a
          href="#"
          class="mr-1"
          @click="onBackClick"
        >
          <i class="bi bi-arrow-left-circle" />
        </a>
        {{ $t('action.user.edit_password') }}
      </div>
      <div class="flex justify-center border border-white">
        <UsersEditPassword />
      </div>
    </div>
  </dialog>
</template>
