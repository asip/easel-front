<template>
  <div>
    <br>
    <UsersLoginGoogle />
    <br>
    <form>
      <div class="card">
        <div class="card-header">
          <div class="float-start">
            <NuxtLink :to="`/`">
              <i class="bi bi-arrow-left-circle" />
            </NuxtLink>
            {{ $t('action.user.login') }}
          </div>
        </div>
        <div class="card-block">
          <br>
          <div class="row d-flex justify-content-sm-center border border-white">
            <div class="col-sm-6">
              <table class="table table-bordered table_rounded">
                <tbody>
                  <tr>
                    <td style="width: 30%;">
                      <label for="email" class="col-form-label-sm">{{ $t('model.user.email') }}</label>
                    </td>
                    <td style="width: 70%;">
                      <input v-model="login_params.email" type="text" :placeholder="$t('model.user.email')" class="form-control">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="password" class="col-form-label-sm">{{ $t('model.user.password') }}</label>
                    </td>
                    <td>
                      <input v-model="login_params.password" type="password" :placeholder="$t('model.user.password')" class="form-control">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row d-flex justify-content-sm-center">
            <div class="form-group col-sm-6">
            &nbsp;
              <button type="button" class="btn btn-primary" @click="onLoginClick">
                {{ $t('action.user.login') }}
              </button>&nbsp;
              <NuxtLink :to="`/signup`" class="btn btn-primary">
                {{ $t('action.user.new') }}
              </NuxtLink>&nbsp;
              <NuxtLink :to="`/`" class="btn btn-outline-secondary">
                {{ $t('action.model.return') }}
              </NuxtLink>
            </div>
          </div>
          <br>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { setMessages } = useToast()
const { login_params, login, login_messages } = useLoginUser()

const onLoginClick = async () => {
  await login()
  if (login_messages.value.length === 0) {
    navigateTo('/')
  } else {
    setMessages(login_messages.value)
  }
}
</script>
