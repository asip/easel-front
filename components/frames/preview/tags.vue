<template>
  <div class="d-flex justify-content-sm-center">
    <div class="col-sm-6">
      <span v-for="tag in frame?.tags">
      <NuxtLink :to="{ path: '/', query: {q: tag} }"><div class="badge rounded-pill bg-light text-info">{{ tag }}</div></NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { frame } = inject('framer') as any
</script>