<template>
  <div class="card-block">
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-10">
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr>
              <td style="width: 10em;">
                <label for="image" class="col-form-label">{{ $t('model.user.image') }}：</label>
              </td>
              <td>
                <input type="file" accept="image/jpg,image/jpeg,image/png" multiple="false" class="form-control" @change="onSelectFile">
                <div v-for="(message, idx) in error_messages.image" :key="idx">
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-if="user.image !== null">
              <td colspan="2">
                <ImagePreview />
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label for="name" class="col-form-label">{{ $t('model.user.name') }}：</label>
              </td>
              <td>
                <input v-model="user.name" type="text" :placeholder="$t('model.user.name')" class="form-control">
                <div v-for="error of v$.name.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
                <div v-for="(message, idx) in error_messages.name" :key="idx">
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td>
                <label for="name" class="col-form-label">{{ $t('model.user.name') }}：</label>
              </td>
              <td>
                <div class="form-control-plaintext">
                  {{ user.name }}
                </div>
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label for="email" class="col-form-label">{{ $t('model.user.email') }}：</label>
              </td>
              <td>
                <input v-model="user.email" type="text" :placeholder="$t('model.user.email')" class="form-control">
                <div v-for="error of v$.email.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
                <div v-for="(message, idx) in error_messages.email" :key="idx">
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td>
                <label for="email" class="col-form-label">{{ $t('model.user.email') }}：</label>
              </td>
              <td>
                <div class="form-control-plaintext">
                  {{ user.email }}
                </div>
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label for="password" class="col-form-label">{{ $t('model.user.password') }}：</label>
              </td>
              <td class="form-group">
                <input v-model="user.password" type="password" :placeholder="$t('model.user.password')" class="form-control">
                <div v-for="error of v$.password.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
                <div v-for="(message, idx) in error_messages.password" :key="idx">
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-if="!user.social_login">
              <td>
                <label for="password_confirmation" class="col-form-label">{{ $t('model.user.password_confirmation') }}：</label>
              </td>
              <td>
                <input v-model="user.password_confirmation" type="password" :placeholder="$t('model.user.password_confirmation')" class="form-control">
                <div v-for="error of v$.password_confirmation.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
                <div v-for="(message, idx) in error_messages.password_confirmation" :key="idx">
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
        <button type="button" class="btn btn-primary" :disabled="processing" @click="onUpdateClick">
          {{ $t('action.model.create') }}
        </button>&nbsp;
        <a href="#" class="btn btn-outline-secondary" @click="onBackClick">
          {{ $t('action.model.return') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useImagePreview } from '~/composables/ui/use_image_preview'
import { useModal } from '~/composables/ui/use_modal'
import { useToast } from '~/composables/ui/use_toast'

const { setFlash } = useToast()
const { openModal, closeModal } = useModal()
const { logged_in, login_user, user, usr_rules, setUser, updateProfile, error_messages, processing, isSuccess, flash, locale } = useLoginUser()

const v$ = useVuelidate(usr_rules, user)

onMounted(() => {
  setUser(login_user)
})

const onSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  useImagePreview(target, user.value)
}

const onUpdateClick = async () => {
  // @ts-ignore
  i18n.global.locale.value = locale.value
  await v$.value.$validate()

  if (!v$.value.$invalid) {
    await updateProfile()
    setFlash(flash.value)
    if (isSuccess()) {
      closeModal('#edit_profile_modal')
      openModal('#profile_modal')
    } else if (!logged_in.value) {
      closeModal('#edit_profile_modal')
    }
  }
}

const onBackClick = () => {
  closeModal('#edit_profile_modal')
  openModal('#profile_modal')
}

onMounted(() => {
  provide('model', user)
})
</script>
