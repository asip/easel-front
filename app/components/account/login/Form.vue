<script setup lang="ts">
const { closeModal } = useModal()

const { setMessages } = useToast()
const { logged_in, login_params, login, login_messages, resetLoginParams } = inject('accounter') as UseLoginUserType

const onLoginClick = async () => {
  await login()
  if (login_messages.value.length === 0) {
    closeModal('#login_modal')
  } else {
    setMessages(login_messages.value)
  }
  resetLoginParams()
}
</script>

<template>
  <form>
    <div class="row d-flex justify-content-sm-center border border-white">
      <div class="col-sm-10">
        <br>
        <AccountLoginGoogle v-if="!logged_in" />
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
                  v-model="login_params.email"
                  type="text"
                  :placeholder="$t('model.user.email')"
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
                  v-model="login_params.password"
                  type="password"
                  :placeholder="$t('model.user.password')"
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
