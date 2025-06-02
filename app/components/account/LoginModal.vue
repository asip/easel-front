<script lang="ts" setup>
const { loggedIn } = useAccount()
const { closeModal, openModal } = useModal()
const { resetLoginParams } = inject('accounter') as useAccountType

const form = useTemplateRef('form')

const onSignupClick = () => {
  closeModal('#login_modal')
  resetLoginParams()
  openModal('#signup_modal')
}

const onCloseClick = () => {
  form?.value.onCloseClick()
}
</script>

<template>
  <div
    id="login_modal"
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
            {{ $t('action.user.login') }}
          </div>
          <button
            type="button"
            class="btn-close"
            @click="onCloseClick"
          />
        </div>
        <div class="modal-body">
          <div class="row d-flex justify-content-sm-center border border-white">
            <div class="col-sm-10">
              <AccountLoginGoogle v-if="!loggedIn" /><br>
              <button
                class="btn btn-outline-secondary"
                style="margin-bottom: 5px;"
                @click="onSignupClick"
              >
                <i class="bi bi-person-plus-fill" />&nbsp;{{ $t('action.user.new') }}
              </button>
            </div>
          </div>
          <AccountLoginForm ref="form" />
        </div>
      </div>
    </div>
  </div>
</template>
