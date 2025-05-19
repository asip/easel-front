<script lang="ts" setup>
const { setFlash } = useToast()
const { openModal, closeModal } = useModal()
const { user, signup, errorMessages, processing, isSuccess, flash, locale } = useAccount()
const signupRules = getSignupRules(user.value)

const { r$ } = useI18nRegle(user, signupRules)

onMounted(() => {
  i18n.global.locale.value = locale.value
})

const onSelectFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  useImagePreview(target, user.value)
}

const onSignupClick = async () => {
  i18n.global.locale.value = locale.value
  const { valid } = await r$.$validate()

  if (valid) {
    await signup()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#signup_modal')
      openModal('#login_modal')
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
              <tr v-if="user.image !== null">
                <td colspan="2">
                  <ImagePreview v-model="user" />
                </td>
              </tr>
              <tr>
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
              <tr>
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
              <tr>
                <td>
                  <label
                    for="password"
                    class="col-form-label"
                  >{{ $t('model.user.password') }}：</label>
                </td>
                <td>
                  <input
                    v-model="user.password"
                    name="password"
                    type="password"
                    :placeholder="$t('model.user.password')"
                    autocomplete="new-password"
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
              <tr>
                <td>
                  <label
                    for="password_confirmation"
                    class="col-form-label"
                  >{{ $t('model.user.password_confirmation') }}：</label>
                </td>
                <td>
                  <input
                    v-model="user.password_confirmation"
                    name="password_confirmation"
                    type="password"
                    :placeholder="$t('model.user.password_confirmation')"
                    autocomplete="new-password"
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
            @click="onSignupClick"
          >
            {{ $t('action.model.create') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
