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
        <!-- if logged_in? && @user.id != current_user.id -->
          <!-- if current_user.following?(@user) -->
            <!-- link_to "フォロー中", user_follow_relationships_path(@user.id), data: { turbo_method: :delete } -->
          <!-- else -->
            <!-- link_to "フォローする", user_follow_relationships_path(@user.id), data: { turbo_method: :post } -->
          <!-- end -->
        <!-- end -->
        </div>
      </div>
      <br>
    </div>
  </div>
  <br>
</template>

<script setup lang="ts">

  const route = useRoute()
  const { id  } = route.params

  const router = useRouter()

  const { user, getUser } = useUser()

  await getUser(id as string)

  provide('user', user)

  const onPageBack = () => {
    router.go(-1)
  }
</script>