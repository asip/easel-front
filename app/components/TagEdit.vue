<script lang="ts" setup>
const model = defineModel<string[]>()

const { initTagEditor, closeTagEditor } = useTagEditor({ key: 'tagEditorRef' })

onMounted(() => {
  // console.log(frame)
  if (import.meta.client && model.value){ initTagEditor(model) }
})

onUnmounted(() => {
  if (import.meta.client) closeTagEditor()
})
</script>

<template>
  <input
    ref="tagEditorRef"
    type="text"
    name="tag_editor"
    value=""
    class="input h-auto"
  >
</template>
