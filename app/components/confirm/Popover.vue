<script setup lang="ts">
const { id, disabled, popoverClass } = defineProps<{
  id: string
  disabled: boolean
  popoverClass: string
}>()

const emit = defineEmits<{ click: [] }>()

const onClick = (): void => {
  emit('click')
}
</script>

<template>
  <div :id="id" popover="auto" :class="popoverClass">
    <div class="card shadow gap-2 p-1 rounded-[10px] border border-red-200">
      <div>
        <slot name="message" />
        <button class="btn btn-sm btn-outline btn-secondary" :disabled="disabled" @click="onClick">
          <slot name="label" />
        </button>
      </div>
    </div>
  </div>
</template>
