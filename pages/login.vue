<template>
  <div class="col-sm-12 mx-auto">
    <br>
    <div class="col-sm-8 mx-auto">
      <NuxtLink :to="`/signup`" class="btn btn-light btn-outline-secondary">
        {{ $t('action.user.new') }}
      </NuxtLink><br>
    </div>
    <br>
    <form>
      <div class="card col-sm-8 mx-auto">
        <div class="card-header">
          <div class="float-start">
            <NuxtLink :to="`/`">
              <i class="bi bi-arrow-left-circle" />
            </NuxtLink>
            {{ $t('action.user.login') }}
          </div>
        </div>
        <div class="card-block">
          <div class="row d-flex justify-content-sm-center border border-white">
            <div class="col-sm-8">
              <br>
              <UsersLoginGoogle />
              <br>
              <table class="table table-bordered table_rounded">
                <tbody>
                  <tr>
                    <td style="width: 5em:">
                      <label for="email" class="col-form-label-sm">{{ $t('model.user.email') }}</label>
                    </td>
                    <td>
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
            <div class="form-group col-sm-8">
            &nbsp;
              <button type="button" class="btn btn-primary" @click="onLoginClick">
                {{ $t('action.user.login') }}
              </button>&nbsp;
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
import { useToast } from '~/composables/ui/use_toast'

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
