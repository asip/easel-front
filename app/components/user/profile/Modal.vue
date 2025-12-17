<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

import type { User } from '~/interfaces'

const user = defineModel<User>()

const { p2br } = useQuill()

const sanitizedProfile = computed<string>(() => {
  if (user.value) {
    return p2br(sanitizeHtml(user.value?.profile)).replace(/\n/g, '<br>')
  } else {
    return ''
  }
})

</script>

<template>
  <dialog id="user_profile_modal" class="modal">
    <div class="modal-box">
      <div class="flex gap-1">
        <PreviewImage v-model="user" :small="true" />
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
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
