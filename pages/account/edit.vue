<template>
  <div>
    <br>
    <form>
      <div class="card" data-controller="preview">
        <div class="card-block">
          <div class="row">
            <div class="col-sm-12 clearfix">
              <div class="float-start">
                &nbsp;
                <NuxtLink to="/account/profile">
                  <i class="bi bi-arrow-left-circle" />
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="text-center">プロフィール編集</div>
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
