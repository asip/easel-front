<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const { p2br } = useQuill()

const { loginUser } = inject('account') as UseAccountType

const sanitizedProfile = computed<string>(() => {
  return p2br(sanitizeHtml(loginUser.value.profile)).replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="flex justify-center border border-white">
    <div class="flex justify-center mb-1">
      <DisplayImage v-model="loginUser" :small="true" />
    </div>
  </div>
  <div class="flex justify-center">
    <table class="table table-bordered table-rounded">
      <tbody>
        <tr>
          <td class="w-[10em]">{{ $t('model.user.name') }}：</td>
          <td>{{ loginUser.name }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.user.email') }}：</td>
          <td>{{ loginUser.email }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.user.profile') }}：</td>
          <td class="wrap-break-word">
            <span v-html="sanitizedProfile" />
          </td>
        </tr>
        <tr>
          <td>{{ $t('model.user.time_zone') }}：</td>
          <td>{{ loginUser.time_zone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
