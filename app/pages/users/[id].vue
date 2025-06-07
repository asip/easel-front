<script setup lang="ts">
import { useFollow } from '~/composables/use-follow'

const route = useRoute()
const { id } = route.params
const refPage = route.query.ref
const refId = route.query.ref_id

const { user, getUser } = useUser()
const { loggedIn, loginUser } = useAccount()
const { queryString } = useFrameSearch()
const { following, follow, unfollow, isFollowing } = useFollow()

const userId = id as string

await getUser(userId)

if (loggedIn.value) {
  await isFollowing(userId)
}

provide('user', user)

const onPageBack = async () => {
  if (refPage === 'frame') {
    await navigateTo({ path: `/frames/${refId}` })
  } else {
    await navigateTo({ path: '/', query: queryString.value })
  }
}

const onFollowClick = async () => {
  await follow(user.value.id)
}

const onUnfollowClick = async () => {
  await unfollow(user.value.id)
}
</script>

<template>
  <div>
    <br>
    <div class="card bg-base-100 shadow shadow-sm rounded-[20px] pt-2 pb-2 ml-2 mr-2 mb-2">
      <div class="flex justify-between">
        <div class="ml-3" @click="onPageBack"><i class="bi bi-arrow-left-circle" /></div>
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
    <UsersFrameList
      :user-id="userId"
      page="user_profile"
    />
  </div>
</template>
