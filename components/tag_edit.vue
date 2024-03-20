<script lang="ts" setup>
import { useTagEditor } from '~/composables/ui/use_tag_editor'
import type { Frame } from '~/interfaces/frame'

const modelValue = defineModel<Frame>()

const { tagEditorRef, initTagEditor, closeTagEditor } = useTagEditor()

const tag_list = computed(() => modelValue.value?.tag_list)

onMounted(() => {
  // console.log(frame)
  modelValue.value && initTagEditor(modelValue.value)
})

onUnmounted(() => {
  closeTagEditor()
})
</script>

<template>
  <input
    ref="tagEditorRef"
    type="text"
    name="tag_editor"
    value=""
    class="form-control"
  >
  <input
    id="tag_list"
    v-model="tag_list"
    type="hidden"
  >
</template>
