<template>
  <div>
    <br>
    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-12 clearfix">
            <div class="float-start">
              &nbsp;
              <NuxtLink to="/">
                <i class="bi bi-arrow-left-circle" />
              </NuxtLink>&nbsp;
              <NuxtLink to="/account/edit">
                <i class="bi bi-pencil-square" />
              </NuxtLink>&nbsp;
              <button
                type="button"
                class="btn-icon-local"
                data-bs-toggle="modal"
                data-bs-config="{backdrop:true}"
                data-bs-target="#delete_modal"
              >
                <i class="bi bi-x-circle" />
              </button>
            </div>
          </div>
        </div>
        <div class="text-center">
          {{ $t('model.user.model_name') }}
        </div>
        <br>
        <UsersPreviewImage :original="false" />
        <div class="row d-flex justify-content-sm-center">
          <div class="col-sm-6">
            <table class="table table-bordered table_rounded">
              <tbody>
                <tr>
                  <td style="width: 25%;">
                    <label for="name" class="col-form-label">{{ $t('model.user.name') }}：</label>
                  </td>
                  <td style="width: 75%;">
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
    <br>
    <AccountDeleteModal />
    <UsersFrameList :user-id="userId" page="profile" />
  </div>
</template>

<script setup lang="ts">

const { logged_in, login_user } = useLoginUser()

const userId = login_user.value.id?.toString()

provide('user', login_user)

if (!logged_in.value) {
  await navigateTo('/')
}
</script>
