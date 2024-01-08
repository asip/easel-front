<template>
  <div>
    <br>
    <form>
      <div class="card col-sm-12 mx-auto">
        <div class="card-block">
          <div class="row">
            <div class="clearfix">
              <div class="float-start">
                &nbsp;
                <NuxtLink to="/">
                  <i class="bi bi-arrow-left-circle" />
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="text-center">
            {{ $t('action.user.edit') }}
          </div>
        </div>
        <br>
        <UsersEditInput />
        <br>
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
