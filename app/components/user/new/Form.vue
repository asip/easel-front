<script lang="ts" setup>
const { setFlash } = useSonner()
const { openModal, closeModal } = useModal()
const { tzOptions } = useTimeZone()
const { user, image, previewUrl, initTimeZone, signup, externalErrors, processing, isSuccess, clearProfile, clearExternalErrors, flash } = useAccount()
const { signupRules } = useAccountRules(user.value)

const { r$ } = useI18nRegle(user, signupRules, { externalErrors })

const file = useTemplateRef('file')

onMounted(() => {
  if (import.meta.client) initTimeZone()
})

const onSelectFile = (evt: Event): void => {
  const target = evt.target as HTMLInputElement
  useImagePreview({ target, file: image, previewUrl: previewUrl })
}

const onSignupClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  if (valid) {
    await signup()
    setFlash(flash.value)
    if (isSuccess()) {
      clearProfile()
      closeModal('#signup_modal')
      openModal('#login_modal')
    }
  }
}

const clearForm = (): void => {
  if (file.value) file.value.value = ''
  clearProfile()
  clearExternalErrors()
  r$.$clearExternalErrors()
  r$.$reset()
}

defineExpose({ clearForm })
</script>

<template>
  <div class="card-block">
    <form>
      <div class="flex justify-center">
        <table class="table table-bordered table-rounded table-fixed">
          <tbody>
            <tr>
              <td class="w-[12em]">
                {{ $t('model.user.image') }}：
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
              <td colspan="2" class="justify-canter">
                <PreviewImage v-model="previewUrl" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="user_name">{{ $t('model.user.name') }}：</label>
              </td>
              <td>
                <input
                  id="user_name"
                  v-model="user.name"
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
            <tr>
              <td>
                <label for="user_email">{{ $t('model.user.email') }}：</label>
              </td>
              <td>
                <input
                  id="user_email"
                  v-model="user.email"
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
            <tr>
              <td>
                {{ $t('model.user.profile') }}：
              </td>
              <td class="wrap-break-word">
                <div class="rounded-[5px] editor-border">
                  <Editor
                    ref="editor"
                    v-model="user.profile"
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
                <label for="user_time_zone">{{ $t('model.user.time_zone') }}：</label>
              </td>
              <td>
                <ClientOnly>
                  <select
                    id="user_time_zone"
                    v-model="user.time_zone"
                    class="select"
                  >
                    <option v-for="option in tzOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </ClientOnly>
              </td>
            </tr>
            <tr>
              <td>
                <label for="user_password">{{ $t('model.user.password') }}：</label>
              </td>
              <td>
                <input
                  id="user_password"
                  v-model="user.password"
                  type="password"
                  placeholder=""
                  autocomplete="new-password"
                  class="input"
                >
                <div
                  v-for="error of r$.$errors.password"
                  :key="error"
                >
                  <div class="text-red-500">{{ error }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="user_password_confirmation">{{ $t('model.user.password_confirmation') }}：</label>
              </td>
              <td>
                <input
                  id="user_password_confirmation"
                  v-model="user.password_confirmation"
                  type="password"
                  placeholder=""
                  autocomplete="new-password"
                  class="input"
                >
                <div
                  v-for="error of r$.$errors.password_confirmation"
                  :key="error"
                >
                  <div class="text-red-500">{{ error }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-2">
        <div class="flex justify-end w-120">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="processing"
            @click="onSignupClick"
          >
            {{ $t('action.model.create') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
