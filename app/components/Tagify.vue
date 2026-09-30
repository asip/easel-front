<script lang="ts">
import type { TagifyOptions } from '~/composables'

export interface AutocompleteTagsType {
  tags: Ref<string[] | undefined>
  filterBy: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
}
</script>

<script lang="ts" setup>
const model = defineModel<string[]>()

const { options } = defineProps<{
  options: TagifyOptions
}>()

const tagify = useTemplateRef('tagifyRef')
const { tags, init, close } = useTagify(tagify, model, options)

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
