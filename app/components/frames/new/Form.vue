<script setup lang="ts">
import type { UseFrameType } from '~/composables/use-frame'

const { setFlash } = useToast()
const { loggedIn } = useAccount()
const { frame, frameId, createFrame, errorMessages, processing, isSuccess, flash, locale } = inject('framer') as UseFrameType

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
  if (frame.value.comment.replace(/<[^>]+>/g, '').replace(/\n/g, '') == ''){
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
    } else if (!loggedIn.value) {
      await navigateTo('/')
    }
  }
}

const updateContent = (content: string) => {
  if (frame.value.comment.replace(/<[^>]+>/g, '').replace(/\n/g, '') != ''){
    frame.value.comment = content
  } else {
    frame.value.comment = ''
  }
}
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table_rounded">
        <tbody>
          <tr>
            <td style="width: 7em;">
              <label
                for="file"
                class=""
              >{{ $t('model.frame.file') }}：</label>
            </td>
            <td>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                class="file-input"
                @change="onSelectFile"
              >
              <div
                v-for="(message, idx) in errorMessages.file"
                :key="idx"
              >
                <div class="text-red-500">{{ message }}</div>
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
                class=""
              >{{ $t('model.frame.name') }}：</label>
            </td>
            <td>
              <input
                v-model="frame.name"
                type="text"
                :placeholder="$t('model.frame.name')"
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
              <label
                for="tag_list"
                class=""
              >{{ $t('model.frame.tag_list') }}：</label>
            </td>
            <td>
              <TagEdit v-model="frame" />
              <div
                v-for="error of r$.$fields.tags.$errors"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                for="shooted_at"
                class=""
              >{{ $t('model.frame.shooted_at') }}：</label>
            </td>
            <td>
              <input
                v-model="frame.shooted_at"
                type="datetime-local"
                class="input"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label
                for="comment"
                class=""
              >{{ $t('model.frame.comment') }}：</label>
            </td>
            <td>
              <div class="rounded-[5px]" style="border: 1px solid lavender;height: 50px;">
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
