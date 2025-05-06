<script setup lang="ts">
const { loggedIn, loginUser } = useAccount()
</script>

<template>
  <div>
    <br>
    <div class="card kadomaru">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-12">
            <div class="float-start p-left-10 p-top-5">
              <NuxtLink to="/">
                <i class="bi bi-arrow-left-circle" />
              </NuxtLink>&nbsp;
            </div>
            <div class="text-center p-top-5 p-bottom-5">
              {{ $t('action.user.frame_list') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <AccountFrameList
      v-if="loggedIn"
      v-model="loginUser"
      page="profile"
    />
  </div>
</template>
