<script lang="ts" setup>
import type Quill from "quill"

const { empty2pbr, pbr2empty } = useQuill()

const model = defineModel<string>()

const modelValue = computed<string>({
  get () {
    return empty2pbr(model.value)
  },
  set (value: string | undefined) {
    model.value = pbr2empty(value)
  }
})

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
  if (getText()?.replace(/\n/g, '') != ''){
    modelValue.value = content
  } else {
    clearContents()
  }
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

<style>
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
