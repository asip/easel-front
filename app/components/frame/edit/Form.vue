<script setup lang="ts">
const { setFlash } = useSonner()
const { referers } = useReferer()
const { loggedIn } = useAccount()
const {
  frame,
  tagList,
  shootedAt,
  updateFrame,
  externalErrors,
  backendErrorInfo,
  set404Alert,
  refresh,
  processing,
  isSuccess,
  flash,
} = inject('framer') as UseFrameType
const { editFrameRules } = useFrameRules()

const { r$ } = useI18nRegle(frame, editFrameRules, { externalErrors })

// console.log(frame)
// console.log(frame.tag_list)

const onEditClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  // console.log(frame)
  if (valid) {
    await updateFrame()
    set404Alert()
    setFlash(flash.value)
    const path = `/frames/${frame?.value.id}/edit`
    const framePath = `/frames/${frame?.value.id}`
    if (isSuccess()) {
      await refresh()
      if (referers.value[path]) {
        await navigateTo(referers.value[path])
      } else {
        await navigateTo(framePath)
      }
    } else if (!loggedIn.value) {
      if (referers.value[path]) {
        await navigateTo(referers.value[path])
      } else {
        await navigateTo(framePath)
      }
    } else {
      await redirect404()
    }
  }
}

const redirect404 = async (): Promise<void> => {
  if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Frame') {
    await navigateTo(`/frames/${frame?.value.id}`)
    globalThis.setTimeout(() => {
      reloadNuxtApp()
    }, 2000)
  }
}
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded table-fixed">
        <tbody>
          <tr>
            <td class="w-[10em]">
              <label for="frame_name">{{ $t('model.frame.name') }}：</label>
            </td>
            <td>
              <input
                id="frame_name"
                v-model="frame.name"
                type="text"
                placeholder=""
                class="input"
              >
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
              >
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
              >
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
              <input id="frame_private" v-model="frame.private" type="checkbox" class="checkbox" >
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
