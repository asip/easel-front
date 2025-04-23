<script setup lang="ts">
import type Quill from "quill"
import { QuillyEditor } from 'vue-quilly';
import { useRegle } from '@regle/core'
import type { UseCommentType } from '~/composables/use-comment'

const { setFlash } = useToast()
const { logged_in, login_user } = useLoginUser()
const { comment, error_messages, processing, isSuccess, flash, locale, getComments, createComment } = inject('commenter') as UseCommentType

const options = ref({
  theme: 'bubble',
  modules: {
    toolbar: true
  },
  placeholder: '',
  readOnly: false
})

const editorRef: Ref = useTemplateRef('editorRef')
let quill: Quill | undefined

const { r$ } = useRegle(comment,commentRules)

onMounted(async () => {
  i18n.global.locale.value = locale.value
  if(import.meta.client){
    const QuillClass = (await import('quill')).default
    quill = editorRef.value?.initialize(QuillClass)
  }
})

const onCreateCommentClick = async () => {
  if (quill?.getText().replace(/\n/g, '') == ''){
    comment.value.body = ''
  }

  i18n.global.locale.value = locale.value
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
      r$.$reset()
      quill?.setContents([])
      comment.value.body = ''
      await getComments()
    }
  }
}

const updateContent = (content: string) => {
  if (quill?.getText().replace(/\n/g, '') != ''){
    comment.value.body = content
  } else {
    comment.value.body = ''
  }
}
</script>

<template>
  <br v-if="logged_in">
  <div
    v-if="logged_in"
    class="card col-sm-8 mx-auto"
  >
    <div class="card-block">
      <div class="row d-flex">
        <div
          class="clearfix "
          style="line-height: 35px;"
        >
          <div
            class="float-start"
            style="padding-left:5px;"
          >
            <img
              :src="`${login_user.image_thumb_url}`"
              alt=""
              class="rounded"
              width="20"
              height="20"
              decoding="async"
            >
          </div>
          <div
            class="float-start small align-middle"
            style="padding-left:5px;"
          >
            <div class="badge rounded-pill bg-light text-info">
              {{ login_user.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <form>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10">
            <div class="col-12 kadomaru" style="border: 1px solid lavender; height: 50px;">
              <ClientOnly>
                <QuillyEditor
                  ref="editorRef"
                  v-model="comment.body"
                  :options="options"
                  @update:model-value="updateContent"
                />
              </ClientOnly>
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
              v-for="(message, idx) in error_messages.body"
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
            class="form-group col-10"
            style="padding-bottom:10px;"
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
