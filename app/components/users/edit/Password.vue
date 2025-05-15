<script setup lang="ts">
import type { useAccountType } from '~/composables/use-account'

const { setFlash } = useToast()
const { openModal, closeModal, removeBackdrop } = useModal()
const { loggedIn, loginUser , user, updatePassword, errorMessages, processing, isSuccess, flash, locale } = inject('accounter') as useAccountType
const passwordRules = getPasswordRules(user.value)

const { r$ } = useI18nRegle(user, passwordRules)

onMounted(()=>{
  i18n.global.locale.value = locale.value
})

const onUpdateClick = async () => {
  i18n.global.locale.value = locale.value
  const { valid } = await r$.$validate()

  if (valid) {
    await updatePassword()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#edit_password_modal')
      openModal('#profile_modal')
    } else if (!loggedIn.value) {
      closeModal('#edit_password_modal')
      removeBackdrop()
    }
  }
}
</script>

<template>
  <div class="card-block">
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-10">
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr v-if="!loginUser.social_login">
              <td>
                <label
                  for="current_password"
                  class="col-form-label"
                >{{ $t('model.user.current_password') }}：</label>
              </td>
              <td class="form-group">
                <input
                  v-model="user.current_password"
                  type="password"
                  :placeholder="$t('model.user.current_password')"
                  class="form-control"
                >
                <div
                  v-for="error of r$.$errors.current_password"
                  :key="error"
                >
                  <div>{{ error }}</div>
                </div>
                <div
                  v-for="(message, idx) in errorMessages.current_password"
                  :key="idx"
                >
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label
                  for="password"
                  class="col-form-label"
                >{{ $t('model.user.password') }}：</label>
              </td>
              <td class="form-group">
                <input
                  v-model="user.password"
                  type="password"
                  :placeholder="$t('model.user.password')"
                  class="form-control"
                >
                <div
                  v-for="error of r$.$errors.password"
                  :key="error"
                >
                  <div>{{ error }}</div>
                </div>
                <div
                  v-for="(message, idx) in errorMessages.password"
                  :key="idx"
                >
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label
                  for="password_confirmation"
                  class="col-form-label"
                >{{ $t('model.user.password_confirmation') }}：</label>
              </td>
              <td>
                <input
                  v-model="user.password_confirmation"
                  type="password"
                  :placeholder="$t('model.user.password_confirmation')"
                  class="form-control"
                >
                <div
                  v-for="error of r$.$errors.password_confirmation"
                  :key="error"
                >
                  <div>{{ error }}</div>
                </div>
                <div
                  v-for="(message, idx) in errorMessages.password_confirmation"
                  :key="idx"
                >
                  <div>{{ message }}</div>
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
  </div>
</template>
