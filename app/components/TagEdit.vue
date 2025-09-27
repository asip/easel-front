<script lang="ts" setup>
import type { Frame } from '~/interfaces'

const modelValue = defineModel<Frame>()

const { initTagEditor } = useTagEditor({ key: 'tagEditorRef' })

const tagList = computed(() => modelValue.value?.tag_list)

onMounted(() => {
  // console.log(frame)
  if(modelValue.value){ initTagEditor(modelValue.value) }
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
  <input
    id="tag_list"
    v-model="tagList"
    type="hidden"
  >
</template>
