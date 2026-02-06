<script setup lang="ts">
const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { comment, externalErrors, backendErrorInfo, processing, isSuccess, set404Alert, flash, createComment } = useComment()
const { getComments } = useComments()

const frameId = inject('frameId') as number
const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const editor = useTemplateRef('editor')

comment.value.frame_id = frameId

const onCreateClick = async (): Promise<void> => {
  r$.$touch()
  r$.$clearExternalErrors()
  r$.$reset()
  const { valid } = await r$.$validate()

  // console.log(r$.body.$invalid)
  // console.log(r$..$invalid)
  // console.log(r$.$error)
  // console.log(r$.$errors)
  // console.log(comment.body)

  if (valid) {
    await createComment()
    set404Alert()
    setFlash(flash.value)
    if (isSuccess()) {
      comment.value.body = ''
      editor.value?.focus()
      r$.$touch()
      r$.$reset()
      await getComments(frameId, { cache: false })
    } else {
      redirect404()
    }
  }
}

const redirect404 = async (): Promise<void> => {
  if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Frame') {
    await navigateTo(`/frames/${frameId}`)
    globalThis.setTimeout(() => {
      reloadNuxtApp()
    }, 2000)
  }
}
</script>

<template>
  <div v-if="loggedIn" class="flex justify-center">
    <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-8.75">
          <div class="flex justify-start items-center gap-1">
            <div class="avatar w-5 h-5">
              <img
                :src="`${loginUser.image_thumb_url}`"
                :alt="loginUser.name"
                class="rounded w-5 h-5"
                decoding="async"
              >
            </div>
            <div class="badge badge-outline badge-accent rounded-full">
              {{ loginUser.name }}
            </div>
          </div>
        </div>
        <form>
          <div class="flex justify-center wrap-break-word">
            <div class="w-full rounded-[5px] editor-border">
              <Editor
                ref="editor"
                v-model="comment.body"
              />
            </div>
          </div>
          <div class="flex justify-between w-full mt-1">
            <div>
              <div
                v-for="error of r$.$errors.body"
                :key="error"
              >
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-outline btn-primary"
                :disabled="processing"
                @click="onCreateClick"
              >
                {{ $t('action.comment.post') }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
