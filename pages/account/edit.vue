<template>
  <div>
    <br>
    <form>
      <div class="card" data-controller="preview">
        <div class="card-header">
          <div class="float-start">
            <NuxtLink to="/account/profile">
              <i class="bi bi-arrow-left-circle" />
            </NuxtLink>
            プロフィール編集
          </div>
        </div>
        <div class="card-block">
          <br>
          <UsersEditInput />
          <br>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { logged_in } = useLoginUser()

if (!logged_in.value) {
  await navigateTo('/')
}
</script>
