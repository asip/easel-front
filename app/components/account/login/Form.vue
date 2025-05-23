<script setup lang="ts">
const { closeModal, removeBackdrop } = useModal()


const { setFlash } = useToast()
const { loggedIn, loginParams, login, isSuccess, flash, errorMessages, resetLoginParams, clearErrorMessages } = inject('accounter') as useAccountType

const { r$ } = useI18nRegle(loginParams, signinRules)

watch(
  () => r$.$errors,
  () => {
    clearErrorMessages()
  }
)

const onLoginClick = async () => {
  const { valid } = await r$.$validate()

  if (valid) {
    await login()
    setFlash(flash.value)
    if (isSuccess()) {
      resetLoginParams()
      r$.$reset()
      closeModal('#login_modal')
      removeBackdrop()
    }
  }
}

const onCloseClick = () => {
  resetLoginParams()
  clearErrorMessages()
  r$.$reset()
  closeModal('#login_modal')
}

defineExpose({ onCloseClick })
</script>

<template>
  <form>
    <div class="row d-flex justify-content-sm-center border border-white">
      <div class="col-sm-10">
        <br>
        <AccountLoginGoogle v-if="!loggedIn" />
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr>
              <td style="width: 6em;">
                <label
                  for="email"
                  class="col-form-label-sm"
                >{{ $t('model.user.email') }}</label>
              </td>
              <td>
                <input
                  v-model="loginParams.email"
                  name="email"
                  type="email"
                  :placeholder="$t('model.user.email')"
                  autocomplete="email"
                  class="form-control"
                >
                <div
                  v-for="error of r$.$errors.email"
                  :key="error"
                >
                  <div>{{ error }}</div>
                </div>
                <div
                  v-for="(message, idx) in errorMessages.email"
                  :key="idx"
                >
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label
                  for="password"
                  class="col-form-label-sm"
                >{{ $t('model.user.password') }}</label>
              </td>
              <td>
                <input
                  v-model="loginParams.password"
                  name="password"
                  type="password"
                  :placeholder="$t('model.user.password')"
                  autocomplete="current-password"
                  class="form-control"
                >
                <div
                  v-for="error of r$.$errors.password"
                  :key="error"
                >
                  <div>{{ error }}</div>
                </div>
                <div
                  v-for="(message, idx) in errorMessages.password"
                  :key="idx"
                >
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <div class="form-group col-sm-10">
            &nbsp;
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="onLoginClick"
        >
          {{ $t('action.user.login') }}
        </button>
      </div>
    </div>
  </form>
</template>
