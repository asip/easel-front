<script setup lang="ts">
import { useFollow } from '~/composables/use-follow'

const route = useRoute()
const { id } = route.params
const ref_page = route.query.ref
const ref_id = route.query.ref_id

const { user, getUser } = useUser()
const { logged_in, login_user } = useLoginUser()
const { frame_query } = useFrameSearch()
const { following, follow, unfollow, isFollowing } = useFollow()

const userId = id as string

await getUser(userId)

if (logged_in.value) {
  await isFollowing(userId)
}

provide('user', user)

const onPageBack = async () => {
  if (ref_page === 'frame') {
    await navigateTo({ path: `/frames/${ref_id}` })
  } else {
    await navigateTo({ path: '/', query: { q: frame_query.value.word, page: frame_query.value.page } })
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
    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-12 clearfix">
            <div class="float-start">
              &nbsp;
              <span @click="onPageBack"><i class="bi bi-arrow-left-circle" /></span>
            </div>
          </div>
        </div>
        <div class="text-center">
          {{ user.name }}
        </div>
        <br>
        <UsersPreviewImage
          v-model="user"
          :original="false"
        />
        <div class="row d-flex justify-content-sm-center">
          <div class="col-sm-6 text-center">
            <div v-if="logged_in && user.id != login_user.id">
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
        <br>
      </div>
    </div>
    <br>
    <UsersFrameList
      :user-id="userId"
      page="user_profile"
    />
  </div>
</template>
