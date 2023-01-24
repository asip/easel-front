<template>
  <nav class="navbar navbar-expand-sm navbar-light c-bgcolor">
    <div class="container-fluid">
      <div class="align-middle">
        <NuxtLink :to="`/`" class='navbar-brand'>
          <i class="bi bi-palette"></i> Easel
        </NuxtLink>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul v-if="!logged_in" class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink :to="`/login`" class="nav-link">Login</NuxtLink>
          </li>
        </ul>
        <ul v-else class="navbar-nav justify-content-sm-center me-auto">
          <li class="nav-item dropdown small">
            <a class="nav-link dropdown-toggle btn btn-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ login_user.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDropdownMenuLink">
              <li><NuxtLink :to="`/`" class="dropdown-item">profile</NuxtLink></li>
              <li><NuxtLink to="/frames/new" class="dropdown-item">Upload</NuxtLink></li>
              <li><button type="button" class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
          </li>
        </ul>
        <span class="navbar-nav justify-content-sm-center">
          <TagSearch/>
        </span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  const { $bootstrap } = useNuxtApp()

  const { login_user, logged_in, logout } = useLoginUser()
</script>