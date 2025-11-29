<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import type { Comment } from '~/interfaces'
import type { RefQuery } from '~/types'


const { p2br } = useQuill()
const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { comment, body, externalErrors, updateComment, deleteComment, flash, getComments, isSuccess, processing, setComment } = useComment()

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const edit = ref<boolean>(false)

const commentModel = defineModel<Comment>()

const editor: Ref = useTemplateRef('editor')

const queryMapWithRef = computed<RefQuery>(() => ({ ref: JSON.stringify({ from: 'frame' }) }))

const sanitizedCommentBody = computed<string>(() =>
  p2br(sanitizeHtml(commentModel.value?.body ?? '')).replace(/\n/g, '<br>')
)

comment.value.frame_id = commentModel.value?.frame_id

const onEditClick = (): void => {
  edit.value = true
  setComment({ from: commentModel.value })
}

const onCancelClick = (): void => {
  edit.value = false
  setComment({ from: commentModel.value })
}

const onUpdateClick = async (): Promise<void> => {
  /*
  if (editor.value?.getText().replace(/\n/g, '') === ''){
    editor.value?.clearContents()
  }
  */
  r$.$touch()
  r$.$clearExternalErrors()
  r$.$reset()
  const { valid } = await r$.$validate()

  if (valid) {
    await updateComment()
    setFlash(flash.value)
    if (isSuccess()) {
      r$.$touch()
      r$.$reset()
      setComment({ to: commentModel.value })
      edit.value = false
    }
  }
}

const updateContent = (content: string): void => {
  if (editor.value?.getText().replace(/\n/g, '') != ''){
    comment.value.body = content
  } else {
    editor.value?.clearContents()
  }
}

const onDeleteClick = async (): Promise<void> => {
  if (commentModel.value) { await deleteComment(commentModel.value) }
    setFlash(flash.value)
  if (isSuccess()) {
    await getComments(commentModel.value?.frame_id, { client: true })
  }
}
</script>

<template>
  <div class="flex justify-center pt-2">
    <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-[35px]">
          <div class="flex justify-between">
            <div class="flex items-center gap-1">
              <NuxtLink
                :to="{ path: `/users/${commentModel?.user_id}`, query: queryMapWithRef }"
                class="avatar"
              >
                <div class="w-5 h-5">
                  <img
                    :src="`${commentModel?.user_image_url}`"
                    :alt="commentModel?.user_name"
                    class="rounded"
                  >
                </div>
              </NuxtLink>
              <NuxtLink
                :to="{ path: `/users/${commentModel?.user_id}`, query: queryMapWithRef }"
                class="badge badge-outline badge-accent hover:badge-primary rounded-full"
              >
                {{ commentModel?.user_name }}
              </NuxtLink>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ commentModel?.created_at }}
              </div>
            </div>
            <div
              v-if="loggedIn && commentModel?.user_id == loginUser.id"
              class="flex gap-1"
            >
              <button v-if="!edit" class="link link-hover" @click="onEditClick">
                <i class="bi bi-pencil-square text-accent hover:text-primary" />
              </button>
              <button v-else class="link link-hover" @click="onCancelClick">
                <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
              </button>
              <button
                class="link link-hover"
                :disabled="processing"
                @click="onDeleteClick"
              >
                <i class="bi bi-x-circle text-accent hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="!edit" class="flex justify-start items-center">
          <table class="table table-bordered table-rounded table-fixed">
            <tbody>
              <tr>
                <td class="wrap-break-word">
                  <span v-html="sanitizedCommentBody" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <form v-else>
          <div class="flex justify-start">
            <div class="w-full rounded-[5px] editor-border">
              <Editor
                ref="editor"
                v-model="body"
                @update="updateContent"
              />
            </div>
          </div>
          <div class="flex justify-between w-full mt-1">
            <div>
            <div
              v-for="error of r$.$errors.body"
              :key="error"
            >
              <div class="text-red-500">{{ error }}</div>
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
        </form>
      </div>
    </div>
  </div>
</template>
