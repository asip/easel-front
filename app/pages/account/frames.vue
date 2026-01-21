<script setup lang="ts">
const route = useRoute()

const { referers } = useReferer()
const { loggedIn } = useAccount()

const from = referers.value[route.path]
</script>

<template>
  <div>
    <br>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] pt-2 pb-2 ml-2 mr-2 mb-2 w-full sm:w-9/10">
        <div class="flex justify-between">
          <div>
            <NuxtLink :to="from" class="ml-2">
              <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
            </NuxtLink>
          </div>
          <div>
            {{ $t('action.user.frame_list') }}
          </div>
          <div />
        </div>
      </div>
    </div>
    <AccountFrameList
      v-if="loggedIn"
      from="profile"
    />
  </div>
</template>
