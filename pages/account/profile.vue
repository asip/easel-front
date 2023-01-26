<template>
  <br>
  <div class="card">
    <div class="card-header">
      <div class="float-start">
        <NuxtLink to="/"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
        プロフィール
      </div>
      <div class="float-end">
        <NuxtLink to="/account/profile"><i class="bi bi-arrow-right-circle"></i></NuxtLink>
      </div>
    </div>
    <div class="card-block">
      <br>
      <SessionsPreviewImage :original="false" />
      <div class="row d-flex justify-content-sm-center">
        <label for="name" class="form-label col-md-2 label-bg-style">ユーザー名</label>
        <div class="form-group col-sm-4">
          {{ login_user.name }}
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center">
        <label for="email" class="form-label col-md-2 label-bg-style">Eメール</label>
        <div class="form-group col-sm-4">
          {{ login_user.email }}
        </div>
      </div>
      <br>
    </div>
  </div>
  <br>
</template>

<script setup lang="ts">
  const { login_user } = useLoginUser()
</script>

