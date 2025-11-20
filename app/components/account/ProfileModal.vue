<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const { p2br } = useQuill()

const { openModal, closeModal } = useModal()
const { loggedIn, loginUser, setUser, initTimeZone } = inject('account') as UseAccountType

const sanitizedProfile = computed<string>(() => {
  return p2br(sanitizeHtml(loginUser.value.profile)).replace(/\n/g, '<br>')
})

const onCloseClick = (): void => {
  closeModal('#profile_modal')
}

const onEditClick = (): void => {
  closeModal('#profile_modal')
  setUser()
  initTimeZone()
  openModal('#edit_profile_modal')
}

const onEditPasswordClick = (): void => {
  closeModal('#profile_modal')
  setUser()
  openModal('#edit_password_modal')
}

const onDeleteAccountClick = (): void => {
  openModal('#delete_account_modal')
  closeModal('#profile_modal')
}
</script>

<template>
  <dialog
    v-if="loggedIn"
    id="profile_modal"
    class="modal"
  >
    <div
      class="modal-box rounded-[20px] divide-y divide-gray-200"
    >
      <div class="flex justify-start gap-1 pb-1 mb-1">
        <a
          href="#"
          @click.prevent="onCloseClick"
        >
          <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
        </a>
        <a
          href="#"
          @click.prevent="onEditClick"
        >
          <i class="bi bi-pencil-square text-accent hover:text-primary" />
        </a>
        <span v-if="loginUser && !loginUser.social_login">
          <a
            href="#"
            @click.prevent="onEditPasswordClick"
          >
            <i class="bi bi-lock text-accent hover:text-primary" />
          </a>
        </span>
        <a
          href="#"
          @click.prevent="onDeleteAccountClick"
        >
          <i class="bi bi-x-circle text-accent hover:text-primary" />
        </a>
        {{ $t('model.user.model_name') }}
      </div>
      <div class="flex justify-center border border-white">
        <div class="flex justify-center mb-1">
          <PreviewImage v-model="loginUser" :small="true" />
        </div>
      </div>
      <div class="flex justify-center">
        <table class="table table-bordered table-rounded">
          <tbody>
            <tr>
              <td class="w-[9em]">
                <label
                  for="name"
                  class=""
                >{{ $t('model.user.name') }}：</label>
              </td>
              <td>
                <div class="">
                  {{ loginUser.name }}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label
                  for="email"
                  class=""
                >{{ $t('model.user.email') }}：</label>
              </td>
              <td>
                <div class="">
                  {{ loginUser.email }}
                </div>
              </td>
            </tr>
            <tr>
              <td>{{ $t('model.user.profile') }}：</td>
                <td class="wrap-break-word">
                  <span v-html="sanitizedProfile" />
                </td>
              </tr>
            <tr>
              <td>
                <label
                  for="time_zone"
                  class=""
                >{{ $t('model.user.time_zone') }}：</label>
              </td>
              <td>
                <div class="">
                  {{ loginUser.time_zone }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </dialog>
  <AccountDeleteModal />
</template>
