<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { useImagePreview } from '~/composables/ui/use-image-preview'
import { useModal } from '~/composables/ui/use-modal'
import { useToast } from '~/composables/ui/use-toast'
import { getSignupRules } from '~/composables/validation/forms/get-signup-rules'

const { setFlash } = useToast()
const { openModal, closeModal } = useModal()
const { user, signup, clearProfile,error_messages, processing, isSuccess, flash, locale } = useLoginUser()
const signup_rule = getSignupRules(user.value)

const v$ = useVuelidate(signup_rule, user)

const onSelectFile = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  useImagePreview(target, user.value)
}

const onSignupClick = async () => {
  i18n.global.locale.value = locale.value
  await v$.value.$validate()

  if (!v$.value.$invalid) {
    await signup()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#signup_modal')
      openModal('#login_modal')
    }
  }
}

const onBackClick = () => {
  clearProfile()
  closeModal('#signup_modal')
  openModal('#login_modal')
}

defineExpose({ onBackClick })
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
                    v-for="(message, idx) in error_messages.image"
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
                    type="text"
                    :placeholder="$t('model.user.name')"
                    class="form-control"
                  >
                  <div
                    v-for="error of v$.name.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in error_messages.name"
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
                    type="text"
                    :placeholder="$t('model.user.email')"
                    class="form-control"
                  >
                  <div
                    v-for="error of v$.email.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in error_messages.email"
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
                    type="password"
                    :placeholder="$t('model.user.password')"
                    class="form-control"
                  >
                  <div
                    v-for="error of v$.password.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in error_messages.password"
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
                    type="password"
                    :placeholder="$t('model.user.password_confirmation')"
                    class="form-control"
                  >
                  <div
                    v-for="error of v$.password_confirmation.$errors"
                    :key="error.$uid"
                  >
                    <div>{{ error.$message }}</div>
                  </div>
                  <div
                    v-for="(message, idx) in error_messages.password_confirmation"
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
          </button>&nbsp;
          <a
            href="#"
            class="btn btn-outline-secondary"
            @click="onBackClick"
          >
            {{ $t('action.model.return') }}
          </a>
        </div>
      </div>
    </form>
  </div>
</template>
