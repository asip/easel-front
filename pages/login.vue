<template>
  <form>
    <br>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink :to="`/`"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
          ログイン
        </div>
      </div>
      <div class="card-block">
        <br>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="email" class="col-form-label-sm col-sm-2 label-bg-style">Eメール</label>
          <div class="form-group col-sm-4">
            <input type="text" v-model="login_params.email" placeholder="Eメール" class="form-control">
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="password" class="col-form-label-sm col-sm-2 label-bg-style">パスワード</label>
          <div class="form-group col-sm-4">
            <input type="password" v-model="login_params.password" placeholder="パスワード" class="form-control">
          </div>
        </div>
        <br>
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            <button type="button" class="btn btn-primary" @click="login">ログイン</button>&nbsp;
            <NuxtLink :to="`/signup`" class="btn btn-primary">ユーザー登録</NuxtLink>&nbsp;
            <NuxtLink :to="`/`" class="btn btn-outline-secondary">戻る</NuxtLink>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            {{ error_message }}
          </div>
        </div>
        <br>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const { login_params, login, error_message } = useLoginUser();
</script>