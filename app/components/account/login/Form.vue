<script setup lang="ts">
const { closeModal } = useModal()

const { setFlash } = useSonner()
const { loginParams, login, isSuccess, flash, errorMessages, resetLoginParams, clearErrorMessages } = inject('account') as UseAccountType
const { signinRules } = useAccountRules()

const { r$ } = useI18nRegle(loginParams, signinRules)

watch(
  loginParams.value,
  () => {
    clearErrorMessages()
  }
)

const onLoginClick = async () => {
  const { valid } = await r$.$validate()

  if (valid) {
    await login()
    setFlash(flash.value)
    if (isSuccess()) {
      resetLoginParams()
      r$.$reset()
      closeModal('#login_modal')
    }
  }
}

const onCloseClick = () => {
  resetLoginParams()
  clearErrorMessages()
  r$.$reset()
  closeModal('#login_modal')
}

defineExpose({ onCloseClick })
</script>

<template>
  <form>
    <div class="flex justify-center border border-white">
      <table class="table table-bordered table_rounded">
        <tbody>
          <tr>
            <td style="width: 8em;">
              <label
                for="email"
                class=""
              >{{ $t('model.user.email') }}：</label>
            </td>
            <td>
              <input
                v-model="loginParams.email"
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
              <div
                v-for="(message, idx) in errorMessages.email"
                :key="idx"
              >
                <div class="text-red-500">{{ message }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                for="password"
                class=""
              >{{ $t('model.user.password') }}：</label>
            </td>
            <td>
              <input
                v-model="loginParams.password"
                name="password"
                type="password"
                placeholder=""
                autocomplete="current-password"
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
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <div class="flex w-100 pt-2">
        <button
          type="button"
          class="btn btn-outline btn-primary"
          @click="onLoginClick"
        >
          {{ $t('action.user.login') }}
        </button>
      </div>
    </div>
  </form>
</template>
