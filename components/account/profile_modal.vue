<script setup lang="ts">
import { useModal } from '~/composables/ui/use_modal'
import type { UseLoginUserType } from '~/composables/use_login_user'

const { openModal, closeModal } = useModal()
const { logged_in, login_user, setUser } = inject('accounter') as UseLoginUserType

const onCloseClick = () => {
  closeModal('#profile_modal')
}

const onEditClick = () => {
  closeModal('#profile_modal')
  setUser(login_user)
  openModal('#edit_profile_modal')
}
</script>

<template>
  <div
    v-if="logged_in"
    id="profile_modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content col-sm-8">
        <div class="modal-header">
          <div class="float-start">
            <div class="float-start">
              <a href="#" @click="onCloseClick">
                <i class="bi bi-arrow-left-circle" />
              </a>&nbsp;
              <a href="#" @click="onEditClick">
                <i class="bi bi-pencil-square" />
              </a>&nbsp;
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-config="{backdrop:true}"
                data-bs-target="#delete_account_modal"
              >
                <i class="bi bi-x-circle" />
              </a>
            </div>
            {{ $t('model.user.model_name') }}
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="row d-flex justify-content-sm-center border border-white">
            <UsersPreviewImage v-model="login_user" :original="false" />

            <div class="row d-flex justify-content-sm-center">
              <div class="col-sm-10">
                <br>
                <table class="table table-bordered table_rounded">
                  <tbody>
                    <tr>
                      <td style="width: 8em;">
                        <label for="name" class="col-form-label">{{ $t('model.user.name') }}：</label>
                      </td>
                      <td>
                        <div class="form-control-plaintext">
                          {{ login_user.name }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="email" class="col-form-label">{{ $t('model.user.email') }}：</label>
                      </td>
                      <td>
                        <div class="form-control-plaintext">
                          {{ login_user.email }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AccountDeleteModal />
</template>
