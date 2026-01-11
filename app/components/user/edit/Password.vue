<script setup lang="ts">
const { setFlash } = useSonner()
const { openModal, closeModal } = useModal()
const { loggedIn, loginUser , user, updatePassword, externalErrors, processing, isSuccess, flash } = inject('account') as UseAccountType
const { passwordRules } = useAccountRules(user.value)

const { r$ } = useI18nRegle(user, passwordRules, { externalErrors })

const onUpdateClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  if (valid) {
    await updatePassword()
    setFlash(flash.value)
    if (isSuccess()) {
      user.value.current_password = ''
      closeModal('#edit_password_modal')
      openModal('#profile_modal')
    } else if (!loggedIn.value) {
      user.value.current_password = ''
      closeModal('#edit_password_modal')
    }
  }
}

const clearForm = (): void => {
  r$.$reset()
}

defineExpose({ clearForm })
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table-rounded">
        <tbody>
          <tr v-if="!loginUser.social_login">
            <td class="w-[12em]">
              <label for="user_current_password">{{ $t('model.user.current_password') }}：</label>
            </td>
            <td>
              <input
                id="user_current_password"
                v-model="user.current_password"
                type="password"
                placeholder=""
                autocomplete="current-password"
                class="input"
              >
              <div
                v-for="error of r$.$errors.current_password"
                :key="error"
              >
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
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
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr v-if="!user.social_login">
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
                <div class="text-red-500 text-xs">{{ error }}</div>
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
