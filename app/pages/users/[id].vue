<script setup lang="ts">
const route = useRoute()
const { id } = route.params

const { setFlash } = useSonner()
const { openModal } = useModal()
const { referers } = useReferer()
const { user, getUser } = useUser()
const { loggedIn, account } = useAccount()
const { queryMap } = useFrameSearch()
const { flash, following, follow, unfollow, isFollowing } = useFollow()

const { refItems } = useCookieStore()

const userId = id?.toString()

await getUser(`${userId}`)

if (loggedIn.value) {
  await isFollowing(`${userId}`)
}

provide('user', user)

const onPageBack = async (): Promise<void> => {
  if (referers.value[route.path] == '/') {
    await navigateTo({ path: '/', query: queryMap.value })
  } else {
    refItems.value = '{}'
    await navigateTo(referers.value[route.path])
  }
}

const onNameClick = (): void => {
  openModal('#user_profile_modal')
}

const onFollowClick = async (): Promise<void> => {
  await follow(user.value.id)
  setFlash(flash.value)
}

const onUnfollowClick = async (): Promise<void> => {
  await unfollow(user.value.id)
  setFlash(flash.value)
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2 mb-2 w-full sm:w-9/10">
        <div class="relative">
          <div class="flex justify-between items-center pl-4 pr-4 pt-1 pb-1">
            <div class="cursor-pointer z-0">
              <div @click="onPageBack">
                <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
              </div>
            </div>
            <div class="cursor-pointer z-0">
              <div v-if="loggedIn && user.id != account.id">
                <button
                  v-if="following"
                  class="btn btn-xs btn-outline btn-primary"
                  @click="onUnfollowClick"
                >
                  {{ $t('action.user.unfollow') }}
                </button>
                <button v-else class="btn btn-xs btn-outline btn-primary" @click="onFollowClick">
                  {{ $t('action.user.follow') }}
                </button>
              </div>
              <div v-else />
            </div>
            <div
              class="absolute inset-0 bg-opacity-0 flex justify-center items-center z-10 pointer-events-none"
            >
              <div class="flex gap-1 items-center">
                <div class="avatar">
                  <div class="w-5 h-5 rouded-full">
                    <img :src="`${user?.image_three_url}`" alt="" >
                  </div>
                </div>
                <div class="link pointer-events-auto" @click="onNameClick">{{ user.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UserProfileModal v-model="user" />
    <UserFrameList :user-id="userId" from="user_profile" />
  </div>
</template>
