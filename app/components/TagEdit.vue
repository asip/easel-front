<script lang="ts" setup>
const modelValue = defineModel<string[]>()

const { initTagEditor } = useTagEditor({ key: 'tagEditorRef' })


onMounted(() => {
  // console.log(frame)
  if (modelValue.value){ initTagEditor(modelValue) }
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
