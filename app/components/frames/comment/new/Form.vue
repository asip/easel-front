<script setup lang="ts">
import type { UseCommentType } from '~/composables/use-comment'

const { setFlash } = useToast()
const { loggedIn, loginUser } = useAccount()
const { comment, errorMessages, processing, isSuccess, flash, locale, getComments, createComment } = inject('commenter') as UseCommentType

const options = ref({
  theme: 'bubble',
  modules: {
    toolbar: true
  },
  placeholder: '',
  readOnly: false
})

const editor: Ref = useTemplateRef('editor')

const { r$ } = useI18nRegle(comment,commentRules)

onMounted(async () => {
  i18n.global.locale.value = locale.value
})

const onCreateCommentClick = async () => {
  if (editor.value?.quill?.getText().replace(/\n/g, '') == ''){
    comment.value.body = ''
  }

  i18n.global.locale.value = locale.value
  r$.$touch()
  r$.$reset()
  const { valid } =await r$.$validate()

  // console.log(r$.$fields.body.$invalid)
  // console.log(r$..$invalid)
  // console.log(r$.$error)
  // console.log(r$.$errors)
  // console.log(comment.body)

  if (valid) {
    await createComment()
    setFlash(flash.value)
    if (isSuccess()) {
      editor.value?.quill?.setContents([])
      comment.value.body = ''
      r$.$touch()
      r$.$reset()
      await getComments()
    }
  }
}

const updateContent = (content: string) => {
  if (editor.value?.quill?.getText().replace(/\n/g, '') != ''){
    comment.value.body = content
  } else {
    comment.value.body = ''
  }
}
</script>

<template>
  <div
    v-if="loggedIn"
    class="card col-sm-8 mx-auto kadomaru-20 p-bottom-10"
  >
    <div class="card-block">
      <div class="row d-flex">
        <div
          class="clearfix "
          style="line-height: 35px;"
        >
          <div
            class="float-start p-left-5"
          >
            <img
              :src="`${loginUser.image_thumb_url}`"
              alt=""
              class="rounded"
              width="20"
              height="20"
              decoding="async"
            >
          </div>
          <div
            class="float-start small align-middle p-left-5"
          >
            <div class="badge rounded-pill bg-light text-info">
              {{ loginUser.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <form>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10">
            <div class="col-12 kadomaru-5" style="border: 1px solid lavender; height: 50px;">
              <Editor
                ref="editor"
                v-model="comment.body"
                :options="options"
                @update="updateContent"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="col-sm-10">
            <div
              v-for="error of r$.$errors.body"
              :key="error"
            >
              <div class="text-danger">
                {{ error }}
              </div>
            </div>
            <div
              v-for="(message, idx) in errorMessages.body"
              :key="idx"
            >
              <p class="text-danger">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div
            class="form-group col-10 p-top-10"
          >
            <button
              type="button"
              class="btn btn-light form-control"
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
</template>
