<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

import type { Comment } from '~/interfaces'

const { p2br } = useQuill()

const commentModel = defineModel<Comment>()

const sanitizedCommentBody = computed<string>(() =>
  p2br(sanitizeHtml(commentModel.value?.body ?? '')).replace(/\n/g, '<br>'),
)
</script>

<template>
  <table class="table table-bordered table-rounded table-fixed">
    <tbody>
      <tr>
        <td class="wrap-break-word">
          <span v-html="sanitizedCommentBody" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
