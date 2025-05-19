<script setup lang="ts">
const { closeModal, removeBackdrop } = useModal()

const { setMessages } = useToast()
const { loggedIn, loginParams, login, loginMessages, resetLoginParams } = inject('accounter') as useAccountType

const onLoginClick = async () => {
  await login()
  if (loginMessages.value.length === 0) {
    resetLoginParams()
    closeModal('#login_modal')
    removeBackdrop()
  } else {
    setMessages(loginMessages.value)
  }
}
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
