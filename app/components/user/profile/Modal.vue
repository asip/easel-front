<script setup lang="ts">
import type { User } from '~/types'

const user = defineModel<User>()
</script>

<template>
  <dialog id="user_profile_modal" class="modal">
    <div class="modal-box divide-y divide-gray-200">
      <UserProfile v-model="user" />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
