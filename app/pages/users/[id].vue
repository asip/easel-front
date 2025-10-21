<script setup lang="ts">
import type { RefQuery } from '~/interfaces'

const route = useRoute()
const { id } = route.params
const ref = route.query.ref
const refItems: RefQuery = ref ? JSON.parse(ref.toString()) : {}

const { setFlash } = useSonner()
const { user, getUser } = useUser()
const { loggedIn, loginUser } = useAccount()
const { queryMap } = useFrameSearch()
const { flash, following, follow, unfollow, isFollowing } = useFollow()

const userId = id?.toString()

await getUser(`${userId}`)

if (loggedIn.value) {
  await isFollowing(`${userId}`)
}

provide('user', user)

const onPageBack = async () => {
  if (refItems.from === 'frame') {
    await navigateTo({ path: `/frames/${refItems.id}` })
  } else {
    await navigateTo({ path: '/', query: queryMap.value })
  }
}

const onFollowClick = async () => {
  await follow(user.value.id)
  setFlash(flash.value)
}

const onUnfollowClick = async () => {
  await unfollow(user.value.id)
  setFlash(flash.value)
}
</script>

<template>
  <div>
    <br>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] pt-2 pb-2 ml-2 mr-2 mb-2 w-full sm:w-9/10">
        <div class="flex justify-between">
          <div class="ml-3" @click="onPageBack">
            <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
          </div>
          <div class="flex gap-1 items-center">
            <div class="avatar">
              <div class="w-5 h-5 rouded-full">
                <img
                  :src="`${user?.image_three_url}`"
                  alt=""
                >
              </div>
            </div>
            <div>{{ user.name }}</div>
          </div>
          <div v-if="loggedIn && user.id != loginUser.id" class="mr-5">
            <button
              v-if="following"
              class="btn btn-xs btn-outline btn-primary"
              @click="onUnfollowClick"
            >
              {{ $t('action.user.unfollow') }}
            </button>
            <button
              v-else
              class="btn btn-xs btn-outline btn-primary"
              @click="onFollowClick"
            >
              {{ $t('action.user.follow') }}
            </button>
          </div>
          <div v-else />
        </div>
      </div>
    </div>
    <UsersFrameList
      :user-id="userId"
      page="user_profile"
    />
  </div>
</template>
