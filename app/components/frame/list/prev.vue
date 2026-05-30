<script lang="ts" setup>
const { $i18n } = useNuxtApp()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { t } = $i18n as any

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
