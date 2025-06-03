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
  <div
    v-if="loggedIn && loginUser && !loginUser.social_login"
    id="edit_password_modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content col-sm-8 kadomaru-20 p-bottom-10">
        <div class="modal-header">
          <div class="float-start">
            <a
              href="#"
              @click="onBackClick"
            >
              <i class="bi bi-arrow-left-circle" />
            </a>
            {{ $t('action.user.edit_password') }}
          </div>
        </div>
        <div class="modal-body">
          <div class="row d-flex justify-content-sm-center border border-white">
            <UsersEditPassword />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
