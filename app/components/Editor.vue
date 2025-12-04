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

const editorRef = useTemplateRef('editorRef')
let quill: Quill | undefined

onMounted(async () => {
  if (import.meta.client){
    const QuillClass = (await import('quill')).default
    quill = editorRef.value?.initialize(QuillClass)
  }
})

const updateContent = (content: string): void => {
  emit('update', content)
}

const clearContents = (): void => {
  // quill?.setContents([])
  modelValue.value = '<p><br></p>'
}

const getText = (): string | undefined => {
  return quill?.getText()
}

const focus = (): void => {
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

/* (Quill bubble テーマのツールバーのセレクタ) */
.ql-bubble.ql-toolbar {
  z-index: 10000;
}
/* (Quill のツールチップのセレクタ) */
.ql-tooltip {
  z-index: 10000;
}
</style>
