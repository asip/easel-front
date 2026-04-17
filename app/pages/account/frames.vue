<script setup lang="ts">
const route = useRoute()

const { referers } = useReferer()
const { loggedIn } = useAccount()

const { refItems } = useCookieStore()

const from = referers.value[route.path]

const onPageBack = async (): Promise<void> => {
  refItems.value = '{}'
  await navigateTo(from)
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div
        class="card bg-base-100 shadow rounded-[20px] pt-1 pb-1 ml-2 mr-2 mt-2 mb-2 w-full sm:w-9/10"
      >
        <div class="flex justify-between">
          <div>
            <NuxtLink class="ml-2" @click="onPageBack">
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
    <AccountFrameList v-if="loggedIn" from="profile" />
  </div>
</template>
