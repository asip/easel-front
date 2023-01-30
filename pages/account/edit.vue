<template>
  <form>
    <br>
    <div class="card" data-controller="preview">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink to="/account/profile"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
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
</template>

<script>
  const { logged_in } = useLoginUser()

  if(!logged_in.value ){
    await navigateTo('/')
  }
</script>