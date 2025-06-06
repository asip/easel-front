<script lang="ts" setup>
const route = useRoute()

const accounter = useAccount()
const { loginUser, loggedIn, logout } = accounter
const { frameQuery, queryString, searchFrame } = useFrameSearch()

const { closeDropdown } = useDropdown('dropdown')
const { openModal } = useModal()

provide('accounter', accounter)

const onLoginClick = () => {
  openModal("#login_modal")
}

const onProfileClick = () => {
  closeDropdown()
  openModal("#profile_modal")
}

const onLogoutClick = async () => {
  await logout()
  if (route.path === '/frames/new' || route.path === '/account/frames') {
    await navigateTo('/')
  } else if (route.path.match(/^\/frames\/\d+\/edit$/)) {
    await navigateTo(`/frames/${route.params.id}`)
  }
}

const onTopPageClick = async () => {
  frameQuery.value.word = ''
  frameQuery.value.page = 1
  // frameQuery.value.pages = 1
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
  <div class="sticky top-0 drawer drawer-end z-[1000]">
    <input id="search-sidebar" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-base-100 shadow shadow-sm">
        <div class="navbar-start">
          <NuxtLink
            class=""
            @click="onTopPageClick"
          >
            <i class="bi bi-palette" /> Easel
          </NuxtLink>
        </div>
        <!--<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>-->
        <div class="navbar-center">
          <details v-if="loggedIn" ref="dropdown" class="dropdown">
            <summary>
              {{ loginUser.name }}
            </summary>
            <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[999]">
              <li>
                <a
                  href="#"
                  class="flex gap-1"
                  @click="onProfileClick"
                >
                  <i class="bi bi-person-fill" />{{ $t('model.user.model_name') }}
                </a>
              </li>
              <li>
                <NuxtLink
                  to="/account/frames"
                  class="flex gap-1"
                  @click="closeDropdown"
                >
                  <i class="bi bi-list" />{{ $t('action.user.frame_list') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/frames/new"
                  class="flex gap-1"
                  @click="closeDropdown"
                >
                  <i class="bi bi-box-arrow-up" />{{ $t('action.frame.upload') }}
                </NuxtLink>
              </li>
              <li>
                <button
                  type="button"
                  class="flex gap-1"
                  @click="onLogoutClick"
                >
                  <i class="bi bi-box-arrow-right" />{{ $t('action.user.logout') }}
                </button>
              </li>
            </ul>
          </details>
          <a
            v-else
            href="#"
            class="flex gap-1"
            @click="onLoginClick"
          >
            <i class="bi bi-box-arrow-in-right" />{{ $t('action.user.login') }}
          </a>
        </div>
        <div class="navbar-end flex gap-2">
          <label for="search-sidebar" aria-label="open sidebar" class="btn btn-ghost">
            <i class="bi bi-search"/>
          </label>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="search-sidebar" aria-label="close sidebar" class="drawer-overlay"/>
      <div class="mt-[70px]">
        <SearchBar />
      </div>
    </div>
  </div>
  <AccountLoginModal v-if="!loggedIn" />
  <AccountSignupModal v-if="!loggedIn" />
  <AccountProfileModal v-if="loggedIn" />
  <AccountEditModal v-if="loggedIn" />
  <AccountPasswordEditModal v-if="loggedIn && loginUser && !loginUser.social_login" />
</template>
