<script setup lang="ts">
import type { useAccountType } from '~/composables/use-account'

const { openModal, closeModal } = useModal()
const { loggedIn, loginUser, setUser } = inject('accounter') as useAccountType

const onCloseClick = () => {
  closeModal('#profile_modal')
}

const onEditClick = () => {
  closeModal('#profile_modal')
  setUser(loginUser)
  openModal('#edit_profile_modal')
}

const onEditPasswordClick = () => {
  closeModal('#profile_modal')
  setUser(loginUser)
  openModal('#edit_password_modal')
}

const onDeleteAccountClick = () => {
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
        <UsersPreviewImage
          v-model="loginUser"
          :original="false"
        />
      </div>
      <div class="flex justify-center">
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr>
              <td style="width: 8em;">
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
          </tbody>
        </table>
      </div>
    </div>
  </dialog>
  <AccountDeleteModal />
</template>
