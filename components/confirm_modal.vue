<template>
  <div
    :id="id"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-danger" @click="onClick">
            {{ label }}
          </button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            {{ $t('action.modal.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: String,
  message: String,
  label: String
})

const emit = defineEmits(['click'])

const onClick = async () => {
  emit('click')
}
</script>
