<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

import type { Frame } from '~/types'

const { p2br } = useQuill()
const { formatHTML } = useDatetimeLocal()

const frame = defineModel<Frame>()

const sanitizedComment = computed<string>(() => {
  return p2br(sanitizeHtml(frame.value?.comment ?? '')).replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="flex justify-center">
    <table class="table table-bordered table-rounded table-fixed ml-2 mr-2">
      <tbody>
        <tr>
          <td class="w-[9em]">{{ $t('model.frame.name') }}：</td>
          <td>{{ frame?.name }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.frame.creator_name') }}：</td>
          <td>{{ frame?.creator_name }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.frame.shooted_at') }}：</td>
          <td>{{ formatHTML(frame?.shooted_at ?? '', 'YYYY/MM/DD (ddd) HH:mm') }}</td>
        </tr>
        <tr>
          <td>{{ $t('model.frame.comment') }}：</td>
          <td class="wrap-break-word">
            <span v-html="sanitizedComment" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-between">
    <div>{{ frame?.created_at }}</div>
    <div>{{ frame?.updated_at }}</div>
  </div>
</template>
