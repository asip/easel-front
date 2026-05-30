<script lang="ts" setup>
const { $i18n } = useNuxtApp()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { t } = $i18n as any

const { maxPage, pages } = defineProps<{ maxPage: number; pages: number }>()

const emit = defineEmits<{ click: [] }>()

const onClick = (): void => {
  emit('click')
}
</script>

<template>
  <ClientOnly>
    <div class="flex justify-center">
      <a class="btn btn-outline btn-primary rounded-full bg-white mb-2" @click="onClick"
        >{{ t('action.search.more') }} {{ maxPage }}/{{ pages }}</a
      >
    </div>
  </ClientOnly>
</template>
