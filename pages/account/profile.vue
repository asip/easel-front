<template>
  <div>
    <br>
    <div class="card">
      <div class="card-header">
        <div class="float-start">
          <NuxtLink to="/">
            <i class="bi bi-arrow-left-circle" />
          </NuxtLink>
          {{ $t('model.user.model_name') }}
        </div>
        <div class="float-end">
          <NuxtLink to="/account/edit">
            <i class="bi bi-arrow-right-circle" />
          </NuxtLink>
        </div>
      </div>
      <div class="card-block">
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
  </div>
</template>

<script setup lang="ts">
import Input from '~/components/users/edit/input.vue'

const { logged_in, login_user } = useLoginUser()

provide('user', login_user)

if (!logged_in.value) {
  await navigateTo('/')
}
</script>
