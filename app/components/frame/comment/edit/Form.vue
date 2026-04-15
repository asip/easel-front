<script setup lang="ts">
import type { Comment } from '~/types'

const { setFlash } = useSonner()

const commentUse = inject('commentUse') as UseCommentType
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
} = commentUse
const { redirectOrReload404 } = useCommentTransition(comment)

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const commentModel = defineModel<Comment>('comment')
const edit = defineModel<boolean>('edit')

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
      redirectOrReload404(backendErrorInfo)
    }
  }
}
</script>

<template>
  <div class="flex justify-start">
    <div class="w-full rounded-[5px] editor-border">
      <Editor v-model="comment.body" />
    </div>
  </div>
  <div class="flex justify-between w-full mt-1">
    <div>
      <div v-for="error of r$.$errors.body" :key="error" class="mt-0.5">
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
