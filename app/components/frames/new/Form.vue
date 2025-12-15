<script setup lang="ts">
const route = useRoute()

const { setFlash } = useSonner()
const { referers } = useReferer()
const { loggedIn } = useAccount()
const { frame, file, previewUrl, tagList,  comment, shootedAt, frameId, createFrame, externalErrors, processing, isSuccess, flash } = inject('framer') as UseFrameType
const { newFrameRules } = useFrameRules()

const editor = useTemplateRef('editor')

const { r$ } = useI18nRegle(frame, newFrameRules, { externalErrors })

// console.log(frame)
// console.log(frame.tag_list)

const onSelectFile = (evt: Event): void => {
  const target = evt.target as HTMLInputElement
  useImagePreview({ target, file: file, previewUrl: previewUrl })
}

const onCreateClick = async (): Promise<void> => {
  if (editor.value?.getText()?.replace(/\n/g, '') == ''){
    frame.value.comment = ''
  }

  const { valid } = await r$.$validate()

  if (valid) {
    await createFrame()
    setFlash(flash.value)
    if (isSuccess()) {
      await navigateTo(`/frames/${frameId.value}`)
    } else if (!loggedIn.value) {
      await navigateTo(referers.value[route.path])
    }
  }
}

const updateContent = (content: string): void => {
  if (editor.value?.getText()?.replace(/\n/g, '') != ''){
    frame.value.comment = content
  } else {
    editor.value?.clearContents()
  }
}
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded table-fixed">
        <tbody>
          <tr>
            <td class="w-[9em]">
              <label for="file" class="">{{ $t('model.frame.file') }}：</label>
            </td>
            <td>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp,image/avif"
                class="file-input"
                @change="onSelectFile"
              >
              <div
                v-for="error of r$.$errors.file"
                :key="error.toString()"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="frame.file || previewUrl">
            <td colspan="2">
              <ImagePreview v-model="previewUrl" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="name" class="">{{ $t('model.frame.name') }}：</label>
            </td>
            <td>
              <input
                v-model="frame.name"
                type="text"
                placeholder=""
                class="input"
              >
              <div
                v-for="error of r$.$errors.name"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="tag_list" class="">{{ $t('model.frame.tag_list') }}：</label>
            </td>
            <td>
              <TagEdit v-model="tagList" />
              <div
                v-for="error of r$.tag_list.$errors"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="creator_name" class="">{{ $t('model.frame.creator_name') }}：</label>
            </td>
            <td>
              <input
                v-model="frame.creator_name"
                type="text"
                placeholder=""
                class="input"
              >
              <div
                v-for="error of r$.$errors.creator_name"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="shooted_at" class="">{{ $t('model.frame.shooted_at') }}：</label>
            </td>
            <td>
              <input
                v-model="shootedAt"
                type="datetime-local"
                class="input"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="comment" class="">{{ $t('model.frame.comment') }}：</label>
            </td>
            <td class="wrap-break-word">
              <div class="rounded-[5px] editor-border">
                <Editor
                  ref="editor"
                  v-model="comment"
                  @update="updateContent"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="private" class="">{{ $t('model.frame.private') }}：</label>
            </td>
            <td>
              <input
                v-model="frame.private"
                type="checkbox"
                class="checkbox"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end pt-2">
      <button
        type="button"
        class="btn btn-outline btn-primary"
        :disabled="processing"
        @click="onCreateClick"
      >
        {{ $t('action.model.create') }}
      </button>
    </div>
  </form>
</template>
