<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

import type { User } from '~/types'

const user = defineModel<User>()

const { p2br } = useTiptap()

const sanitizedProfile = computed<string>(() => {
  if (user.value) {
    return p2br(sanitizeHtml(user.value?.profile)).replace(/\n/g, '<br>')
  } else {
    return ''
  }
})
</script>

<template>
  <div class="flex">{{ user?.name }}</div>
  <div class="flex gap-1 pt-1">
    <DisplayImage v-model="user" :small="true" />
    <table class="table table-bordered table-rounded flex-auto">
      <tbody>
        <tr>
          <td class="flex wrap-break-word items-baseline">
            <span v-html="sanitizedProfile" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
