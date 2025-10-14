<script setup lang="ts">
const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { comment, body, externalErrors, processing, isSuccess, flash, getComments, createComment } = useComment()
const frameId = inject('frameId') as number
const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const editor: Ref = useTemplateRef('editor')

comment.value.frame_id = frameId

const onCreateCommentClick = async () => {
  /*
  if (editor.value?.getText().replace(/\n/g, '') === ''){
    editor.value?.clearContents()
  }
  */
  r$.$touch()
  r$.$clearExternalErrors()
  r$.$reset()
  const { valid } =await r$.$validate()

  // console.log(r$.body.$invalid)
  // console.log(r$..$invalid)
  // console.log(r$.$error)
  // console.log(r$.$errors)
  // console.log(comment.body)

  if (valid) {
    await createComment()
    setFlash(flash.value)
    if (isSuccess()) {
      comment.value.body = ''
      editor.value?.focus()
      r$.$touch()
      r$.$reset()
      await getComments(frameId, { fresh: true })
    }
  }
}

const updateContent = (content: string) => {
  if (editor.value?.getText().replace(/\n/g, '') != ''){
    comment.value.body = content
  } else {
    editor.value?.clearContents()
  }
}
</script>

<template>
  <div v-if="loggedIn" class="flex justify-center">
    <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-[35px]">
          <div
            class="flex justify-start items-center gap-1"
          >
            <div class="avatar w-5 h-5">
              <img
                :src="`${loginUser.image_thumb_url}`"
                :alt="loginUser.name"
                class="rounded"
                style="width:20px;height:20px;"
                decoding="async"
              >
            </div>
            <div class="badge badge-outline badge-accent rounded-full">
              {{ loginUser.name }}
            </div>
          </div>
        </div>
        <form>
          <div class="flex justify-center">
            <div class="w-full rounded-[5px]" style="border: 1px solid lavender;">
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
                @click="onCreateCommentClick"
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
