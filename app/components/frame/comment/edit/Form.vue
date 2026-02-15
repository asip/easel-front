<script setup lang="ts">
import type { Comment } from '~/interfaces'

const { setFlash } = useSonner()

const commenter = inject('commenter') as UseCommentType
const {
  comment,
  externalErrors,
  backendErrorInfo,
  updateComment,
  flash,
  isSuccess,
  set404Alert,
  processing,
  setComment,
} = commenter
const { getComments } = useComments()

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const edit = inject('edit') as Ref<boolean>

const commentModel = defineModel<Comment>()

const onUpdateClick = async (): Promise<void> => {
  r$.$touch()
  r$.$clearExternalErrors()
  r$.$reset()
  const { valid } = await r$.$validate()

  if (valid) {
    await updateComment()
    set404Alert()
    setFlash(flash.value)
    if (isSuccess()) {
      r$.$touch()
      r$.$reset()
      setComment({ to: commentModel.value })
      edit.value = false
    } else {
      redirectOrReload404()
    }
  }
}

const redirectOrReload404 = async (): Promise<void> => {
  if (backendErrorInfo.value.status == 404) {
    if (backendErrorInfo.value.source == 'Frame') {
      await navigateTo(`/frames/${comment.value.frame_id}`)
      globalThis.setTimeout(() => {
        reloadNuxtApp()
      }, 2000)
    } else if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Comment') {
      await getComments(comment.value.frame_id, { cache: false })
    }
  }
}

defineExpose({ redirectOrReload404 })
</script>

<template>
  <div class="flex justify-start">
    <div class="w-full rounded-[5px] editor-border">
      <Editor v-model="comment.body" />
    </div>
  </div>
  <div class="flex justify-between w-full mt-1">
    <div>
      <div v-for="error of r$.$errors.body" :key="error">
        <div class="text-red-500 text-xs">{{ error }}</div>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-outline btn-primary"
        :disabled="processing"
        @click="onUpdateClick"
      >
        {{ $t('action.model.update') }}
      </button>
    </div>
  </div>
</template>
