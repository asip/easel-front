<template>
  <br>
  <div id="googleButton"></div>
  <form>
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
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            {{ error_message }}
          </div>
        </div>
        <br>
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            <button type="button" class="btn btn-primary" @click="onLoginClick">ログイン</button>&nbsp;
            <NuxtLink :to="`/signup`" class="btn btn-primary">ユーザー登録</NuxtLink>&nbsp;
            <NuxtLink :to="`/`" class="btn btn-outline-secondary">戻る</NuxtLink>
          </div>
        </div>
        <br>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const { googleClientID } = useConstants()
  const { login_params, login, login_with_google, error_message } = useLoginUser();

  const onLoginClick = async () => {
    await login()
    if(error_message.value == '') {
      navigateTo('/')
    }
  }

  onMounted(() => {
    google.accounts.id.initialize({
      client_id: googleClientID,
      callback: handleCredentialResponse, //method to run after user clicks the Google sign in button
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  })

  const handleCredentialResponse = async (response: any) => {
    // call your backend API here
    // the token can be accessed as: response.credential
    await login_with_google(response)

    navigateTo('/')
  }
</script>