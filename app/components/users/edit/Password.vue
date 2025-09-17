<script setup lang="ts">
const { setFlash } = useSonner()
const { openModal, closeModal } = useModal()
const { loggedIn, loginUser , user, updatePassword, externalErrors, processing, isSuccess, flash } = inject('account') as UseAccountType
const { passwordRules } = useAccountRules(user.value)

const { r$ } = useI18nRegle(user, passwordRules, { externalErrors })

const onUpdateClick = async () => {
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

const clearForm = () => {
  r$.$reset()
}

defineExpose({ clearForm })
</script>

<template>
  <form>
    <div class="flex justify-center">
      <table class="table table-bordered table_rounded">
        <tbody>
          <tr v-if="!loginUser.social_login">
            <td style="width: 12em;">
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
                placeholder=""
                autocomplete="current-password"
                class="input"
              >
              <div
                v-for="error of r$.$errors.current_password"
                :key="error"
              >
                <div class="text-red-500">{{ error }}</div>
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
