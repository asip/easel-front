<script setup lang="ts">
const { setFlash } = useSonner()
const { openModal, closeModal } = useModal()
const { tzOptions } = useTimeZone()
const { loggedIn, user, updateProfile, externalErrors, processing, isSuccess, flash } = inject('account') as UseAccountType
const { profileRules } = useAccountRules()

// @ts-ignore
const { r$ } = useI18nRegle(user, profileRules, { externalErrors })

const onSelectFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  useImagePreview({ target, model: user.value })
}

const onUpdateClick = async () => {
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

const clearForm = () => {
  r$.$reset()
}

defineExpose({ clearForm })
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded">
        <tbody>
          <tr>
            <td style="width: 9em;">
              <label
                for="image"
                class=""
              >{{ $t('model.user.image') }}：</label>
            </td>
            <td>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
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
          <tr>
            <td colspan="2">
              <ImagePreview v-model="user" />
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label
                for="name"
                class=""
              >{{ $t('model.user.name') }}：</label>
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
              <label
                for="name"
                class=""
              >{{ $t('model.user.name') }}：</label>
            </td>
            <td>
              <div class="">
                {{ user.name }}
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label
                for="email"
                class=""
              >{{ $t('model.user.email') }}：</label>
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
            <td>
              <label
                for="email"
                class=""
              >{{ $t('model.user.email') }}：</label>
            </td>
            <td>
              <div class="">
                {{ user.email }}
              </div>
            </td>
          </tr>
          <tr>
              <td>
                <label
                  for="time_zone"
                  class=""
                >{{ $t('model.user.time_zone') }}：</label>
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
