<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const { p2br } = useQuill()

const { account } = inject('accountUse') as UseAccountType

const sanitizedProfile = computed<string>(() => {
  return p2br(sanitizeHtml(account.value.profile)).replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="flex justify-center border-0">
    <div class="flex justify-center mb-1">
      <DisplayImage v-model="account" :small="true" />
    </div>
  </div>
  <div class="flex justify-center">
    <table class="table table-bordered table-rounded">
      <tbody>
        <tr>
          <td class="w-[10em]">{{ $t('model.user.name') }}：</td>
          <td>{{ account.name }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.user.email') }}：</td>
          <td>{{ account.email }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.user.profile') }}：</td>
          <td class="wrap-break-word">
            <span v-html="sanitizedProfile" />
          </td>
        </tr>
        <tr>
          <td>{{ $t('model.user.time_zone') }}：</td>
          <td>{{ account.time_zone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
