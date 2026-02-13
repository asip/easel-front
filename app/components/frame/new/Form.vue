<script setup lang="ts">
const route = useRoute()

const { setFlash } = useSonner()
const { referers } = useReferer()
const { loggedIn } = useAccount()
const {
  frame,
  file,
  previewUrl,
  tagList,
  shootedAt,
  frameId,
  createFrame,
  externalErrors,
  processing,
  isSuccess,
  flash,
} = inject('framer') as UseFrameType
const { newFrameRules } = useFrameRules()

const { r$ } = useI18nRegle(frame, newFrameRules, { externalErrors })

// console.log(frame)
// console.log(frame.tag_list)

const onSelectFile = (evt: Event): void => {
  const target = evt.target as HTMLInputElement
  useImagePreview({ target, file: file, previewUrl: previewUrl })
}

const onCreateClick = async (): Promise<void> => {
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
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded table-fixed">
        <tbody>
          <tr>
            <td class="w-[10em]">{{ $t('model.frame.file') }}：</td>
            <td>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp,image/avif"
                class="file-input"
                @change="onSelectFile"
              />
              <div v-for="error of r$.$errors.file" :key="error.toString()">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="frame.file || previewUrl">
            <td colspan="2" class="justify-canter">
              <PreviewImage v-model="previewUrl" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="frame_name">{{ $t('model.frame.name') }}：</label>
            </td>
            <td>
              <input
                id="frame_name"
                v-model="frame.name"
                type="text"
                placeholder=""
                class="input"
              />
              <div v-for="error of r$.$errors.name" :key="error">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="tag_list">{{ $t('model.frame.tag_list') }}：</label>
            </td>
            <td>
              <TagEdit v-model="tagList" />
              <div v-for="error of r$.tag_list.$self.$errors" :key="error">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="frame_creator_name">{{ $t('model.frame.creator_name') }}：</label>
            </td>
            <td>
              <input
                id="frame_creator_name"
                v-model="frame.creator_name"
                type="text"
                placeholder=""
                class="input"
              />
              <div v-for="error of r$.$errors.creator_name" :key="error">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="frame_shooted_at">{{ $t('model.frame.shooted_at') }}：</label>
            </td>
            <td>
              <input
                id="frame_shooted_at"
                v-model="shootedAt"
                type="datetime-local"
                class="input"
              />
            </td>
          </tr>
          <tr>
            <td>{{ $t('model.frame.comment') }}：</td>
            <td class="wrap-break-word">
              <div class="rounded-[5px] editor-border">
                <Editor v-model="frame.comment" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="frame_private">{{ $t('model.frame.private') }}：</label>
            </td>
            <td>
              <input id="frame_private" v-model="frame.private" type="checkbox" class="checkbox" />
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
