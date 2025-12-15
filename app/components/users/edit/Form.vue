<script setup lang="ts">
const { setFlash } = useSonner()
const { openModal, closeModal } = useModal()
const { tzOptions } = useTimeZone()
const { loggedIn, user, image, profile, previewUrl, updateProfile, externalErrors, processing, isSuccess, flash } = inject('account') as UseAccountType
const { profileRules } = useAccountRules()

const { r$ } = useI18nRegle(user, profileRules, { externalErrors })

const file = useTemplateRef('file')
const editor = useTemplateRef('editor')

const onSelectFile = (evt: Event): void => {
  const target = evt.target as HTMLInputElement
  useImagePreview({ target, file: image, previewUrl: previewUrl })
}

const onUpdateClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  if (valid) {
    await updateProfile()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#edit_profile_modal')
      openModal('#profile_modal')
    } else if (!loggedIn.value) {
      closeModal('#edit_profile_modal')
    }
  }
}

const updateContent = (content: string): void => {
  if (editor.value?.getText()?.replace(/\n/g, '') != ''){
    user.value.profile = content
  } else {
    editor.value?.clearContents()
  }
}

const clearForm = (): void => {
  r$.$reset()
  if (file.value) file.value.value = ''
}

defineExpose({ clearForm })
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded table-fixed">
        <tbody>
          <tr>
            <td class="w-[9em]">
              <label for="image" class="">{{ $t('model.user.image') }}：</label>
            </td>
            <td>
              <input
                ref="file"
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp,image/avif"
                multiple="false"
                class="file-input"
                @change="onSelectFile"
              >
              <div
                v-for="error of r$.$errors.image"
                :key="error.toString()"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="user.image || previewUrl">
            <td colspan="2">
              <ImagePreview v-model="previewUrl" />
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label for="name" class="">{{ $t('model.user.name') }}：</label>
            </td>
            <td>
              <input
                v-model="user.name"
                name="name"
                type="text"
                placeholder=""
                autocomplete="username"
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
          <tr v-else>
            <td>
              <label for="name" class="">{{ $t('model.user.name') }}：</label>
            </td>
            <td>
              <div class="">
                {{ user.name }}
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label for="email" class="">{{ $t('model.user.email') }}：</label>
            </td>
            <td>
              <input
                v-model="user.email"
                name="email"
                type="email"
                placeholder=""
                autocomplete="email"
                class="input"
              >
              <div
                v-for="error of r$.$errors.email"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td><label for="email" class="">{{ $t('model.user.email') }}：</label></td>
            <td>
              <div class="">
                {{ user.email }}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="profile" class="">{{ $t('model.user.profile') }}：</label>
            </td>
            <td class="wrap-break-word">
              <div class="rounded-[5px] editor-border">
                <Editor
                  ref="editor"
                  v-model="profile"
                  @update="updateContent"
                />
              </div>
              <div
                v-for="error of r$.$errors.profile"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="time_zone" class="">{{ $t('model.user.time_zone') }}：</label>
            </td>
            <td>
              <ClientOnly>
                <select
                  v-model="user.time_zone"
                  class="select"
                >
                  <option v-for="option in tzOptions" :key="option.value" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <div
                  v-for="error of r$.$errors.time_zone"
                  :key="error"
                >
                  <div class="text-red-500">{{ error }}</div>
                </div>
              </ClientOnly>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-2">
      <div class="flex justify-end w-120">
        <button
          type="button"
          class="btn btn-outline btn-primary"
          :disabled="processing"
          @click="onUpdateClick"
        >
          {{ $t('action.model.create') }}
        </button>
      </div>
    </div>
  </form>
</template>
