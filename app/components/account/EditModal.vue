<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { logged_in, login_user, setUser } = inject('accounter') as UseLoginUserType

const onBackClick = () => {
  closeModal('#edit_profile_modal')
  openModal('#profile_modal')
}

onMounted(() => {
  setUser(login_user)
})
</script>

<template>
  <div
    v-if="logged_in"
    id="edit_profile_modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content col-sm-8">
        <div class="modal-header">
          <div class="float-start">
            <div class="float-start">
              <a
                href="#"
                @click="onBackClick"
              >
                <i class="bi bi-arrow-left-circle" />
              </a>
            </div>
            {{ $t('action.user.edit') }}
          </div>
        </div>
        <div class="modal-body">
          <div class="row d-flex justify-content-sm-center border border-white">
            <UsersEditForm />
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
