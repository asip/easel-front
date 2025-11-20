<script setup lang="ts">
const { id, disabled } = defineProps<{
  id: string
  disabled: boolean
}>()

defineSlots<{
  message?:() => any
  label?: () => any
}>()

const emit = defineEmits<{click: []}>()

const onClick = (): void => {
  emit('click')
}
</script>

<template>
  <dialog
    :id="id"
    class="modal"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <p class="py-4">
        <slot name="message" />
      </p>
      <div class="modal-action">
        <button
          class="btn btn-outline btn-secondary"
          :disabled="disabled"
          @click="onClick"
        >
          <slot name="label" />
        </button>
        <form method="dialog">
          <button class="btn btn-outline btn-primary">
            {{ $t('action.modal.close') }}
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
