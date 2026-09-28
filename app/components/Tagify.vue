<script lang="ts">
import type Tagify from '@yaireo/tagify'

export interface AutocompleteTagsType {
  tags: Ref<string[] | undefined>
  filterBy: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
}
</script>

<script lang="ts" setup>
const model = defineModel<string[]>()

const { settings, autocompleteTags } = defineProps<{
  settings: Tagify.TagifySettings
  // eslint-disable-next-line vue/require-default-prop
  autocompleteTags?: AutocompleteTagsType | undefined
}>()

const tagify = useTemplateRef('tagifyRef')
const { tags, init, close } = useTagify(tagify, {
  settings,
  tagList: model,
  autocompleteTags,
})

onMounted(() => {
  // console.log(model.value)
  init()
  tags.value = model.value
})

onUnmounted(() => {
  close()
})
</script>

<template>
  <input ref="tagifyRef" type="text" value="" class="input h-auto" >
</template>
