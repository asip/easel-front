<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import type { Quill } from '@vueup/vue-quill';
import { useToast } from '~/composables/ui/use-toast'
import type { UseFrameType } from '~/composables/use-frame'
import { frameRules } from '~/composables/validation/rules/frame-rules'

const { setFlash } = useToast()
const { logged_in } = useLoginUser()
const { frame, updateFrame, processing, isSuccess, flash, locale } = inject('framer') as UseFrameType

const editorRef = useTemplateRef('editorRef')

const v$ = useVuelidate(frameRules, frame)

// console.log(frame)
// console.log(frame.tags)
// console.log(frame.tag_list)

const onEditClick = async () => {
  const editorEl: Quill = editorRef?.value

  if (editorEl.getText().replace(/\n/g, '') == ''){
    frame.value.comment = ''
  }

  i18n.global.locale.value = locale.value
  await v$.value.$validate()

  // console.log(frame)
  if (!v$.value.$invalid) {
    await updateFrame()

    setFlash(flash.value)
    if (isSuccess()) {
      await navigateTo(`/frames/${frame?.value.id}`)
    } else if (!logged_in.value) {
      await navigateTo(`/frames/${frame?.value.id}`)
    }
  }
}

const updateContent = (content: string) => {
  const editorEl: Quill = editorRef?.value

  if (editorEl.getText().replace(/\n/g, '') != ''){
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
                    v-for="error of v$.name.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
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
                    v-for="error of v$.tags.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    for="shooted_at"
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
                  <div class="kadomaru" style="border: 1px solid lavender;">
                    <ClientOnly>
                      <QuillEditor
                        ref="editorRef"
                        v-model:content="frame.comment"
                        theme="bubble"
                        content-type="html"
                        @update:content="updateContent"
                      />
                    </ClientOnly>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-sm-center">
        <div class="col-sm-10">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="processing"
            @click="onEditClick"
          >
            {{ $t('action.model.update') }}
          </button>&nbsp;
          <NuxtLink
            :to="`/frames/${frame?.id}`"
            class="btn btn-outline-secondary"
          >
            {{ $t('action.model.return') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </form>
</template>
