<template>
  <br>
  <UsersLoginGoogle />
  <form>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink :to="`/`"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
          {{ $t('action.user.login') }}
        </div>
      </div>
      <div class="card-block">
        <br>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="email" class="col-form-label-sm col-sm-2 label-bg-style">{{ $t('model.user.email') }}</label>
          <div class="form-group col-sm-4">
            <input type="text" v-model="login_params.email" :placeholder="$t('model.user.email')" class="form-control">
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="password" class="col-form-label-sm col-sm-2 label-bg-style">{{ $t('model.user.password') }}</label>
          <div class="form-group col-sm-4">
            <input type="password" v-model="login_params.password" :placeholder="$t('model.user.password')" class="form-control">
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            {{ error_message }}
          </div>
        </div>
        <br>
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            <button type="button" class="btn btn-primary" @click="onLoginClick">{{ $t('action.user.login') }}</button>&nbsp;
            <NuxtLink :to="`/signup`" class="btn btn-primary">{{ $t('action.user.new') }}</NuxtLink>&nbsp;
            <NuxtLink :to="`/`" class="btn btn-outline-secondary">{{ $t('action.model.return') }}</NuxtLink>
          </div>
        </div>
        <br>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const { login_params, login, error_message } = useLoginUser();

  const onLoginClick = async () => {
    await login()
    if(error_message.value == '') {
      navigateTo('/')
    }
  }
</script>