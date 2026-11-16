<script lang="ts" setup>
import type { Composer } from 'vue-i18n'

const { $i18n } = useNuxtApp()
const { t } = $i18n as Composer

const { minPage, pages } = defineProps<{ minPage: number; pages: number }>()

const emit = defineEmits<{ click: [] }>()

const onClick = (): void => {
  emit('click')
}
</script>

<template>
  <ClientOnly>
    <div class="flex justify-center">
      <a class="btn btn-outline btn-primary rounded-full bg-white mt-2" @click="onClick"
        >{{ t('action.search.more') }} {{ minPage }}/{{ pages }}</a
      >
    </div>
  </ClientOnly>
</template>
