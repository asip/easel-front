<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'

const modelValue = defineModel<Frame>()
</script>

<template>
  <div class="d-flex justify-content-sm-center">
    <div class="col-sm-10">
      <span
        v-for="(tag, idx) in modelValue?.tags"
        :key="idx"
      >
        <NuxtLink :to="{ path: '/', query: {q: tag} }"><div class="badge rounded-pill bg-light text-info">{{ tag }}</div></NuxtLink>
      </span>
    </div>
  </div>
</template>
