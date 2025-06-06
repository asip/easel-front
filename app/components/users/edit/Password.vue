<script setup lang="ts">
import type { useAccountType } from '~/composables/use-account'

const { setFlash } = useToast()
const { openModal, closeModal } = useModal()
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
      
    }
  }
}
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table_rounded">
        <tbody>
          <tr v-if="!loginUser.social_login">
            <td>
              <label
                for="current_password"
                class=""
              >{{ $t('model.user.current_password') }}：</label>
            </td>
            <td class="">
              <input
                v-model="user.current_password"
                name="current_password"
                type="password"
                :placeholder="$t('model.user.current_password')"
                autocomplete="current-password"
                class="input"
              >
              <div
                v-for="error of r$.$errors.current_password"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
              <div
                v-for="(message, idx) in errorMessages.current_password"
                :key="idx"
              >
                <div class="text-red-500">{{ message }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label
                for="password"
                class=""
              >{{ $t('model.user.password') }}：</label>
            </td>
            <td class="">
              <input
                v-model="user.password"
                name="password"
                type="password"
                :placeholder="$t('model.user.password')"
                autocomplete="new-password"
                class="input"
              >
              <div
                v-for="error of r$.$errors.password"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
              <div
                v-for="(message, idx) in errorMessages.password"
                :key="idx"
              >
                <div class="text-red-500">{{ message }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
            <td>
              <label
                for="password_confirmation"
                class=""
              >{{ $t('model.user.password_confirmation') }}：</label>
            </td>
            <td>
              <input
                v-model="user.password_confirmation"
                name="password_confirmation"
                type="password"
                :placeholder="$t('model.user.password_confirmation')"
                autocomplete="new-password"
                class="input"
              >
              <div
                v-for="error of r$.$errors.password_confirmation"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
              </div>
              <div
                v-for="(message, idx) in errorMessages.password_confirmation"
                :key="idx"
              >
                <div class="text-red-500">{{ message }}</div>
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
