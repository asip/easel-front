<template>
  <div class="d-flex justify-content-sm-center">
    <div class="col-sm-6">
      <span v-for="tag in frame?.tags">
      <NuxtLink :to="`/?q=${tag}`"><div class="badge rounded-pill bg-light text-info">{{ tag }}</div></NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Frame } from '~~/composables/use_frame';

  const frame: Frame | undefined = inject('frame')
</script>