<script setup lang="ts">
import type { UseFrameType } from '~/composables/use-frame'

const { setFlash } = useSonner()
const { loggedIn } = useAccount()
const { frame, updateFrame, refresh, processing, isSuccess, flash, locale } = inject('framer') as UseFrameType

const editor: Ref = useTemplateRef('editor')

const { r$ } = useI18nRegle(frame, frameRules)

// console.log(frame)
// console.log(frame.tags)
// console.log(frame.tag_list)

onMounted(() => {
  i18n.global.locale.value = locale.value
})

const onEditClick = async () => {
  if (editor.value?.getText().replace(/\n/g, '') == ''){
    frame.value.comment = ''
  }

  i18n.global.locale.value = locale.value
  const { valid } = await r$.$validate()

  // console.log(frame)
  if (valid) {
    await updateFrame()

    setFlash(flash.value)
    if (isSuccess()) {
      await refresh()
      await navigateTo(`/frames/${frame?.value.id}`)
    } else if (!loggedIn.value) {
      await navigateTo(`/frames/${frame?.value.id}`)
    }
  }
}

const updateContent = (content: string) => {
  if (editor.value?.getText().replace(/\n/g, '') != ''){
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
                v-for="error of r$.tags.$errors"
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
              <div class="rounded-[5px]" style="border: 1px solid lavender;height: 50px">
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
        @click="onEditClick"
      >
        {{ $t('action.model.update') }}
      </button>
    </div>
  </form>
</template>
