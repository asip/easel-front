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
  <div class="col-sm-12">
    <br>
    <div class="card kadomaru p-bottom-5">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-12 clearfix">
            <div class="float-start p-top-5 p-left-10">
              <span @click="onPageBack"><i class="bi bi-arrow-left-circle" /></span>
            </div>
            <div class="text-center p-top-5 p-bottom-5">
              <img
                :src="`${user?.image_three_url}`"
                alt=""
                class="rounded"
                width="20"
                height="20"
                decoding="async"
              >
              {{ user.name }}
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-sm-center">
          <div class="col-sm-6 text-center">
            <div v-if="loggedIn && user.id != loginUser.id">
              <button
                v-if="following"
                class="btn btn-primary btn-sm"
                @click="onUnfollowClick"
              >
                {{ $t('action.user.unfollow') }}
              </button>
              <button
                v-else
                class="btn btn-outline-primary btn-sm"
                @click="onFollowClick"
              >
                {{ $t('action.user.follow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <UsersFrameList
      :user-id="userId"
      page="user_profile"
    />
  </div>
</template>
