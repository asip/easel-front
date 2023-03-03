<template>
  <form>
    <br>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink :to="`/`"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
          {{ $t('action.user.new') }}
        </div>
      </div>
      <div class="card-block">
        <br>
        <UsersNewInput />
        <br>
      </div>
    </div>
  </form>
</template>