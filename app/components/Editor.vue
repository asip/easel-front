<script lang="ts" setup>
import type Quill from "quill"

const modelValue = defineModel<string>()
const emit = defineEmits<{
  update: [content: string]
}>()

const options = ref({
  theme: 'bubble',
  modules: {
    toolbar: true
  },
  placeholder: '',
  readOnly: false
})

const editorRef: Ref = useTemplateRef('editorRef')
let quill: Quill | undefined

onMounted(async () => {
  if(import.meta.client){
    const QuillClass = (await import('quill')).default
    quill = editorRef.value?.initialize(QuillClass)
  }
})

const updateContent = (content: string) => {
  emit('update', content)
}

const clearContents = () => {
  // quill?.setContents([])
  modelValue.value = '<p><br></p>'
}

const getText = () => {
  return quill?.getText()
}

const focus = () => {
  quill?.focus()
}

defineExpose({
  clearContents,
  getText,
  focus
})

</script>

<template>
  <ClientOnly>
    <QuillyEditor
      ref="editorRef"
      v-model="modelValue"
      :options="options"
      @update:model-value="updateContent"
    />
  </ClientOnly>
</template>

<style scoped>
.ql-container {
  height: 100%;
}
</style>
