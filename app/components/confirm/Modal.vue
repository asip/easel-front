<script setup lang="ts">
const { id, disabled } = defineProps<{
  id: string
  disabled: boolean
}>()

defineSlots<{
  message?: () => string
  label?: () => string
}>()

const emit = defineEmits<{ click: []; clickClose: [] }>()

const onClick = (): void => {
  emit('click')
}

const onCloseClick = (): void => {
  emit('clickClose')
}
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="onCloseClick">
        ✕
      </button>
      <p class="py-4">
        <slot name="message" />
      </p>
      <div class="modal-action">
        <button class="btn btn-outline btn-secondary" :disabled="disabled" @click="onClick">
          <slot name="label" />
        </button>
        <button class="btn btn-outline btn-primary" @click="onCloseClick">
          {{ $t('action.modal.close') }}
        </button>
      </div>
    </div>
  </dialog>
</template>
