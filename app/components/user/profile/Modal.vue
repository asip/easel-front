<script setup lang="ts">
import type { User } from '~/interfaces'

const user = defineModel<User>()
</script>

<template>
  <dialog id="user_profile_modal" class="modal">
    <div class="modal-box">
      <UserProfile v-model="user" />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
