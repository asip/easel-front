<template>
  <form>
    <br>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink :to="`/`">
            <i class="bi bi-arrow-left-circle" />
          </NuxtLink>
          {{ $t('action.user.new') }}
        </div>
      </div>
      <br>
      <UsersNewForm />
      <br>
    </div>
  </form>
</template>
