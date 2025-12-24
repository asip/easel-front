<script lang="ts" setup>
const model = defineModel<string[]>()

const tagEditor = useTemplateRef('tagEditorRef')
const { initTagEditor, closeTagEditor } = useTagEditor({ el: tagEditor })

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
    value=""
    class="input h-auto"
  >
</template>
