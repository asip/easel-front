<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import type Quill from "quill"
import { QuillyEditor } from 'vue-quilly';

import { useToast } from '~/composables/ui/use-toast'
import type { UseCommentType } from '~/composables/use-comment'
import { commentRules } from '~/composables/validation/forms/comment-rules'

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

const v$ = useVuelidate(commentRules, comment)

onMounted(async () => {
  if(import.meta.client){
    const QuillClass = (await import('quill')).default
    quill = editorRef.value?.initialize(QuillClass)
  }
})

const onCreateCommentClick = async () => {
  //editorEl = editorRef?.value

  if (quill?.getText().replace(/\n/g, '') == ''){
    comment.value.body = ''
  }

  i18n.global.locale.value = locale.value
  v$.value.$reset()
  await v$.value.$validate()

  // console.log(v$.value.body.$invalid)
  // console.log(v$.value.$invalid)
  // console.log(v$.value.$error)
  // console.log(v$.value.$errors)
  // console.log(comment.body)

  if (!v$.value.body.$invalid) {
    await createComment()
    setFlash(flash.value)
    if (isSuccess()) {
      v$.value.$reset()
      quill?.setText('')
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
              v-for="error of v$.body.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">
                {{ error.$message }}
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
