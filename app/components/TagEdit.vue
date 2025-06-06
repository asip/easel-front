<script lang="ts" setup>
import type { Frame } from '~/interfaces/frame'
import '@yaireo/tagify/dist/tagify.css'

const modelValue = defineModel<Frame>()

const { initTagEditor, closeTagEditor } = useTagEditor()

const tagList = computed(() => modelValue.value?.tag_list)

onMounted(() => {
  // console.log(frame)
  if(modelValue.value){ initTagEditor(modelValue.value) }
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
    class="input"
  >
  <input
    id="tag_list"
    v-model="tagList"
    type="hidden"
  >
</template>
