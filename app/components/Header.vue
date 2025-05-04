<script lang="ts" setup>

const route = useRoute()

const accounter = useLoginUser()
const { login_user, logged_in, logout } = accounter
const { frame_query, queryString, searchFrame } = useFrameSearch()

provide('accounter', accounter)

const onLogoutClick = async () => {
  await logout()
  if (route.path === '/frames/new' || route.path === '/account/frames') {
    await navigateTo('/')
  } else if (route.path.match(/^\/frames\/\d+\/edit$/)) {
    await navigateTo(`/frames/${route.params.id}`)
  }
}

const onTopPageClick = async () => {
  frame_query.value.word = ''
  frame_query.value.page = 1
  // frame_query.value.pages = 1
  await navigateTo({ path: '/', query: queryString.value })
  await searchFrame({ more: true })
}
</script>

<template>
  <ClientOnly>
    <Toaster
      position="top-right"
      expand
      :visible-toasts="9"
      :duration="2000"
    />
  </ClientOnly>
  <nav class="navbar navbar-expand-sm fixed-top navbar-light c-bgcolor">
    <div class="container-fluid">
      <div class="align-middle">
        <NuxtLink
          class="navbar-brand"
          @click="onTopPageClick"
        >
          <i class="bi bi-palette" /> Easel
        </NuxtLink>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNavDropdown"
        class="collapse navbar-collapse"
      >
        <ul
          v-if="!logged_in"
          class="navbar-nav me-auto"
        >
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              data-bs-toggle="modal"
              data-bs-config="{backdrop:true}"
              data-bs-target="#login_modal"
            >
              <i class="bi bi-box-arrow-in-right" />&nbsp;{{ $t('action.user.login') }}
            </a>
          </li>
        </ul>
        <ul
          v-else
          class="navbar-nav justify-content-sm-center me-auto"
        >
          <li class="nav-item dropdown small">
            <button
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle btn btn-light"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ login_user.name }}
            </button>
            <ul
              class="dropdown-menu dropdown-menu-light"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a
                  href="#"
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-config="{backdrop:true}"
                  data-bs-target="#profile_modal"
                >
                  <i class="bi bi-person-fill" />&nbsp;{{ $t('model.user.model_name') }}
                </a>
              </li>
              <li>
                <NuxtLink
                  to="/account/frames"
                  class="dropdown-item"
                >
                  <i class="bi bi-list" />&nbsp;{{ $t('action.user.frame_list') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/frames/new"
                  class="dropdown-item"
                >
                  <i class="bi bi-box-arrow-up" />&nbsp;{{ $t('action.frame.upload') }}
                </NuxtLink>
              </li>
              <li>
                <button
                  type="button"
                  class="dropdown-item"
                  @click="onLogoutClick"
                >
                  <i class="bi bi-box-arrow-right" />&nbsp;{{ $t('action.user.logout') }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
        <span class="navbar-nav justify-content-sm-center">
          <SearchBar />
        </span>
      </div>
    </div>
  </nav>
  <AccountLoginModal />
  <AccountSignupModal />
  <AccountProfileModal />
  <AccountEditModal />
</template>
