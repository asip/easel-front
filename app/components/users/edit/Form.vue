<script setup lang="ts">
import type { useAccountType } from '~/composables/use-account'
import { profileRules } from "~/composables/index"

const { setFlash } = useToast()
const { openModal, closeModal, removeBackdrop } = useModal()
const { loggedIn, user, updateProfile, errorMessages, processing, isSuccess, flash, locale } = inject('accounter') as useAccountType

const { r$ } = useI18nRegle(user, profileRules)

onMounted(()=>{
  i18n.global.locale.value = locale.value
})

const onSelectFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  useImagePreview(target, user.value)
}

const onUpdateClick = async () => {
  i18n.global.locale.value = locale.value
  const { valid } = await r$.$validate()

  if (valid) {
    await updateProfile()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#edit_profile_modal')
      openModal('#profile_modal')
    } else if (!loggedIn.value) {
      closeModal('#edit_profile_modal')
      removeBackdrop()
    }
  }
}
</script>

<template>
  <div class="card-block">
    <form>
      <div class="row d-flex justify-content-sm-center">
        <div class="col-sm-10">
          <table class="table table-bordered table_rounded">
            <tbody>
              <tr>
                <td style="width: 10em;">
                  <label
                    for="image"
                    class="col-form-label"
                  >{{ $t('model.user.image') }}：</label>
                </td>
                <td>
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    multiple="false"
                    class="form-control"
                    @change="onSelectFile"
                  >
                  <div
                    v-for="(message, idx) in errorMessages.image"
                    :key="idx"
                  >
                    <div>{{ message }}</div>
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
                    class="col-form-label"
                  >{{ $t('model.user.name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="user.name"
                    name="name"
                    type="text"
                    :placeholder="$t('model.user.name')"
                    autocomplete="username"
                    class="form-control"
                  >
                  <div
                    v-for="error of r$.$errors.name"
                    :key="error"
                  >
                    <div>{{ error }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in errorMessages.name"
                    :key="idx"
                  >
                    <div>{{ message }}</div>
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td>
                  <label
                    for="name"
                    class="col-form-label"
                  >{{ $t('model.user.name') }}：</label>
                </td>
                <td>
                  <div class="form-control-plaintext">
                    {{ user.name }}
                  </div>
                </td>
              </tr>
              <tr v-if="!user.social_login">
                <td>
                  <label
                    for="email"
                    class="col-form-label"
                  >{{ $t('model.user.email') }}：</label>
                </td>
                <td>
                  <input
                    v-model="user.email"
                    name="email"
                    type="email"
                    :placeholder="$t('model.user.email')"
                    autocomplete="email"
                    class="form-control"
                  >
                  <div
                    v-for="error of r$.$errors.email"
                    :key="error"
                  >
                    <div>{{ error }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in errorMessages.email"
                    :key="idx"
                  >
                    <div>{{ message }}</div>
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td>
                  <label
                    for="email"
                    class="col-form-label"
                  >{{ $t('model.user.email') }}：</label>
                </td>
                <td>
                  <div class="form-control-plaintext">
                    {{ user.email }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-flex justify-content-sm-center">
        <div class="form-group">
          &nbsp;
          <button
            type="button"
            class="btn btn-primary"
            :disabled="processing"
            @click="onUpdateClick"
          >
            {{ $t('action.model.create') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
