<script setup lang="ts">
import type { Frame } from '~/types'

const frame = defineModel<Frame>()
</script>

<template>
  <dialog id="frame_profile_modal" class="modal">
    <div class="modal-box glass">
      <FrameProfile v-model="frame" />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
