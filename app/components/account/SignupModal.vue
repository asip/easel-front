<script setup lang="ts">
const { openModal, closeModal } = useModal()
const { clearProfile } = useLoginUser()

const onBackClick = () => {
  clearProfile()
  closeModal('#signup_modal')
  openModal('#login_modal')
}
</script>

<template>
  <div
    id="signup_modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content col-sm-8 kadomaru p-bottom-10">
        <div class="modal-header">
          <div class="float-start">
            <div class="float-start">
              <a
                href="#"
                @click="onBackClick"
              >
                <i class="bi bi-arrow-left-circle" />
              </a>&nbsp;
            </div>
            {{ $t('action.user.new') }}
          </div>
          <!---<button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />-->
        </div>
        <div class="modal-body">
          <UsersNewForm />
        </div>
      </div>
    </div>
  </div>
</template>
