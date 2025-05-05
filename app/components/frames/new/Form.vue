<script setup lang="ts">
import type { UseFrameType } from '~/composables/use-frame'

const { setFlash } = useToast()
const { logged_in } = useLoginUser()
const { frame, frameId, createFrame, error_messages, processing, isSuccess, flash, locale } = inject('framer') as UseFrameType

const editor = useTemplateRef('editor')

const { r$ } = useI18nRegle(frame, frameRules)

// console.log(frame)
// console.log(frame.tags)
// console.log(frame.tag_list)

onMounted(() => {
  i18n.global.locale.value = locale.value
})

const onSelectFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  useImagePreview(target, frame.value)
}

const onCreateClick = async () => {
  if (editor.value?.quill?.getText().replace(/\n/g, '') == ''){
    frame.value.comment = ''
  }

  i18n.global.locale.value = locale.value
  const { valid } = await r$.$validate()

  // console.log(frame)
  if (valid) {
    await createFrame()
    setFlash(flash.value)
    if (isSuccess()) {
      await navigateTo(`/frames/${frameId.value}`)
    } else if (!logged_in.value) {
      await navigateTo('/')
    }
  }
}

const updateContent = (content: string) => {
  if (editor.value?.quill?.getText().replace(/\n/g, '') != ''){
    frame.value.comment = content
  } else {
    frame.value.comment = ''
  }
}
</script>

<template>
  <form>
    <div class="card-body">
      <div class="row d-flex justify-content-sm-center">
        <div class="col-sm-10">
          <table class="table table-bordered table_rounded">
            <tbody>
              <tr>
                <td style="width: 7em;">
                  <label
                    for="file"
                    class="col-form-label"
                  >{{ $t('model.frame.file') }}：</label>
                </td>
                <td>
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    class="form-control"
                    @change="onSelectFile"
                  >
                  <div
                    v-for="(message, idx) in error_messages.file"
                    :key="idx"
                  >
                    <div>{{ message }}</div>
                  </div>
                </td>
              </tr>
              <tr v-if="frame.file !== null">
                <td colspan="2">
                  <ImagePreview v-model="frame" />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    for="name"
                    class="col-form-label"
                  >{{ $t('model.frame.name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frame.name"
                    type="text"
                    :placeholder="$t('model.frame.name')"
                    class="form-control"
                  >
                  <div
                    v-for="error of r$.$errors.name"
                    :key="error"
                  >
                    <div>{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    for="tag_list"
                    class="col-form-label"
                  >{{ $t('model.frame.tag_list') }}：</label>
                </td>
                <td>
                  <TagEdit v-model="frame" />
                  <div
                    v-for="error of r$.$fields.tags.$errors"
                    :key="error"
                  >
                    <div>{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    for="comment"
                    class="col-form-label"
                  >{{ $t('model.frame.shooted_at') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frame.shooted_at"
                    type="datetime-local"
                    class="form-control"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    for="comment"
                    class="col-form-label"
                  >{{ $t('model.frame.comment') }}：</label>
                </td>
                <td>
                  <div class="kadomaru-5" style="border: 1px solid lavender;height: 50px;">
                      <Editor
                        ref="editor"
                        v-model="frame.comment"
                        @update="updateContent"
                      />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="float-end p-bottom-10">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="processing"
          @click="onCreateClick"
        >
          {{ $t('action.model.create') }}
        </button>
      </div>
    </div>
  </form>
</template>
