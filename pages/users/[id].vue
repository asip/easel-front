<template>
  <br>
  <div class="card">
    <div class="card-header">
      <div class="float-start">
        <span @click="onPageBack"><i class="bi bi-arrow-left-circle"></i></span>
        {{ user.name }}
      </div>
    </div>
    <div class="card-block">
      <br>
      <UsersPreviewImage :original="false" />
      <div class="row d-flex justify-content-sm-center">
        <div class="col-sm-6 text-center">
          <div v-if="logged_in && user.id != login_user.id">
            <u v-if="following" @click="onUnfollowClick" >フォロー中</u>
            <u v-else @click="onFollowClick">フォローする</u>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
  <br>
</template>

<script setup lang="ts">
  import { useFollow } from "~/composables/use_follow";

  const route = useRoute()
  const { id  } = route.params

  const router = useRouter()

  const { user, getUser } = useUser()
  const { logged_in, login_user } = useLoginUser()
  const { following, follow, unfollow, isFollowing } = useFollow()

  await getUser(id as string)

  if(logged_in.value){
    await isFollowing(id as string)
  }

  provide('user', user)

  const onPageBack = () => {
    router.go(-1)
  }

  const onFollowClick = async () => {
    await follow(user.id)
  }

  const onUnfollowClick = async () => {
    await unfollow(user.id)
  }
</script>