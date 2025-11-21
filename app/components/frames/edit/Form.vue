<script setup lang="ts">
const { setFlash } = useSonner()
const { referers } = useReferer()
const { loggedIn } = useAccount()
const { frame, tagList, comment, shootedAt, updateFrame, refresh, processing, isSuccess, flash } = inject('framer') as UseFrameType
const { editFrameRules } = useFrameRules()

const editor: Ref = useTemplateRef('editor')

const { r$ } = useI18nRegle(frame, editFrameRules)

// console.log(frame)
// console.log(frame.tag_list)

const onEditClick = async (): Promise<void> => {
  if (editor.value?.getText().replace(/\n/g, '') == ''){
    frame.value.comment = ''
  }

  const { valid } = await r$.$validate()

  // console.log(frame)
  if (valid) {
    await updateFrame()

    setFlash(flash.value)
    const path = `/frames/${frame?.value.id}/edit`
    if (isSuccess()) {
      await refresh()
      if (referers.value[path]) {
        await navigateTo(referers.value[path])
      } else {
        await navigateTo(path)
      }
    } else if (!loggedIn.value) {
      if (referers.value[path]) {
        await navigateTo(referers.value[path])
      } else {
        await navigateTo(path)
      }
    }
  }
}

const updateContent = (content: string): void => {
  if (editor.value?.getText().replace(/\n/g, '') != ''){
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
        @click="onEditClick"
      >
        {{ $t('action.model.update') }}
      </button>
    </div>
  </form>
</template>
