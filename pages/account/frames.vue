<template>
  <div>
    <br>
    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-12 clearfix">
            &nbsp;
            <NuxtLink to="/">
              <i class="bi bi-arrow-left-circle" />
            </NuxtLink>&nbsp;
          </div>
        </div>
      </div>
      <div class="text-center">
        {{ $t('action.user.frame_list') }}
      </div>
      <br>
    </div>
    <br>
    <UsersFrameList v-if="logged_in" :user-id="userId" page="profile" />
  </div>
</template>

<script setup lang="ts">
const { logged_in, login_user } = useLoginUser()

const userId = login_user.value.id?.toString()

if (!logged_in.value) {
  await navigateTo('/')
}
</script>
