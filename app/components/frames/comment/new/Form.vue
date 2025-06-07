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
  if (editor.value?.getText().replace(/\n/g, '') === ''){
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
      editor.value?.clearContents()
      comment.value.body = ''
      r$.$touch()
      r$.$reset()
      await getComments()
    }
  }
}

const updateContent = (content: string) => {
  if (editor.value?.getText().replace(/\n/g, '') != ''){
    comment.value.body = content
  } else {
    comment.value.body = ''
  }
}
</script>

<template>
  <div
    v-if="loggedIn"
    class="card bg-base-100 shadow shadow-sm rounded-[20px] ml-2 mr-2 mt-2 mb-10"
  >
    <div class="card-body">
      <div class="leading-[35px]">
        <div
          class="flex justify-start items-center"
        >
          <div class="avatar">
            <div class="w-5 h-5 rouded-full">
              <img
                :src="`${loginUser.image_thumb_url}`"
                alt=""
                class="rounded"
                width="20"
                height="20"
                decoding="async"
              >
            </div>
          </div>
          <div class="badge badge-outline badge-accent rounded-full">
            {{ loginUser.name }}
          </div>
        </div>
      </div>
      <form>
        <div class="flex justify-center">
          <div class="w-full rounded-[5px]" style="border: 1px solid lavender; height: 50px;">
            <Editor
              ref="editor"
              v-model="comment.body"
              :options="options"
              @update="updateContent"
            />
          </div>
        </div>
        <div class="flex justify-start w-full mt-1">
            <div
              v-for="error of r$.$errors.body"
              :key="error"
            >
              <div class="text-red-500">{{ error }}</div>
            </div>
            <div
              v-for="(message, idx) in errorMessages.body"
              :key="idx"
            >
              <p class="text-red-500">{{ message }}</p>
            </div>
        </div>
        <div class="flex justify-end w-full mt-1">
          <button
            type="button"
            class="btn btn-outline btn-primary"
            :disabled="processing"
            @click="onCreateCommentClick"
          >
            {{ $t('action.comment.post') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
