<script setup lang="ts">
const { closeModal } = useModal()

const { setFlash } = useSonner()
const {
  loginParams,
  login,
  isSuccess,
  flash,
  externalErrors,
  clearLoginParams,
  clearExternalErrors,
} = inject('account') as UseAccountType
const { signinRules } = useAccountRules()

const { r$ } = useI18nRegle(loginParams, signinRules, { externalErrors })

watch(loginParams.value, () => {
  clearExternalErrors()
  r$.$clearExternalErrors()
})

const onLoginClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  if (valid) {
    await login()
    setFlash(flash.value)
    if (isSuccess()) {
      clearLoginParams()
      r$.$reset()
      closeModal('#login_modal')
      reloadNuxtApp()
    }
  }
}

const clearForm = (): void => {
  clearLoginParams()
  clearExternalErrors()
  r$.$clearExternalErrors()
  r$.$reset()
}

defineExpose({ clearForm })
</script>

<template>
  <form>
    <div class="flex justify-center border border-white">
      <table class="table table-bordered table-rounded">
        <tbody>
          <tr>
            <td class="w-[9em]">
              <label for="login_email">{{ $t('model.user.email') }}：</label>
            </td>
            <td>
              <input
                id="login_email"
                v-model="loginParams.email"
                type="email"
                placeholder=""
                autocomplete="email"
                class="input"
              >
              <div v-for="error of r$.$errors.email" :key="error">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="login_password">{{ $t('model.user.password') }}：</label>
            </td>
            <td>
              <input
                id="login_password"
                v-model="loginParams.password"
                type="password"
                placeholder=""
                autocomplete="current-password"
                class="input"
              >
              <div v-for="error of r$.$errors.password" :key="error">
                <div class="text-red-500 text-xs">{{ error }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <div class="flex w-100 pt-2">
        <button type="button" class="btn btn-outline btn-primary" @click="onLoginClick">
          {{ $t('action.user.login') }}
        </button>
      </div>
    </div>
  </form>
</template>
