<template>
  <form>
    <br>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink :to="`/`"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
          ユーザー登録
        </div>
      </div>
      <div class="card-block">
        <br>
        <div class="row d-flex justify-content-sm-center">
          <label for="image" class="col-form-label-sm col-sm-3 label-bg-style">アイコン：</label>
          <div class="form-group col-sm-4">
            <input type="file" accept="image/jpg,image/jpeg,image/png" multiple="false" @change="onSelectFile" class="form-control-file" >
            <div v-for="message of error_messages.image">
              <div>{{ message }}</div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="name" class="col-form-label-sm col-sm-3 label-bg-style">ユーザー名：</label>
          <div class="form-group col-sm-4">
            <input type="text" v-model="signup_params.name" placeholder="ユーザー名" class="form-control">
            <div v-for="error of v$.name.$errors" :key="error.$uid">
              <div>{{ error.$message }}</div>
            </div>
            <div v-for="message of error_messages.name">
              <div>ユーザー名{{ message }}</div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="email" class="col-form-label-sm col-sm-3 label-bg-style">Eメール：</label>
          <div class="form-group col-sm-4">
            <input type="text" v-model="signup_params.email" placeholder="Eメール" class="form-control" >
            <div v-for="error of v$.email.$errors" :key="error.$uid">
              <div>{{ error.$message }}</div>
            </div>
            <div v-for="message of error_messages.email">
              <div>Eメール{{ message }}</div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="password" class="col-form-label-sm col-sm-3 label-bg-style">パスワード：</label>
          <div class="form-group col-sm-4">
            <input type="password" v-model="signup_params.password" placeholder="パスワード" class="form-control">
            <div v-for="error of v$.password.$errors" :key="error.$uid">
              <div>{{ error.$message }}</div>
            </div>
            <div v-for="message of error_messages.password">
              <div>パスワード{{ message }}</div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center border border-white">
          <label for="password_confirmation" class="col-form-label-sm col-sm-3 label-bg-style">パスワード(確認)：</label>
          <div class="form-group col-sm-4">
            <input type="password" v-model="signup_params.password_confirmation" placeholder="パスワード(確認)" class="form-control">
            <div v-for="error of v$.password_confirmation.$errors" :key="error.$uid">
              <div>{{ error.$message }}</div>
            </div>
            <div v-for="message of error_messages.password_confirmation">
              <div>パスワード(確認){{ message }}</div>
            </div>
          </div>
        </div>
        <br>
        <div class="d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            <button type="button" @click="signup" class="btn btn-primary">登録</button>&nbsp;
            <NuxtLink :to="`/login`" class="btn btn-outline-secondary">戻る</NuxtLink>
          </div>
        </div>
        <br>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const { signup_params, v$, signup, error_messages } = useSignup()

  const onSelectFile = ( event: Event ) => {
    const target = event.target as HTMLInputElement
    let uploadedFile = target.files![0];

    signup_params.image = uploadedFile ;
  }
</script>