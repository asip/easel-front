<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import type { Comment } from '~/interfaces'

const comment = defineModel<Comment>()

const { p2br } = useQuill()
const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()
const { deleteComment, flash, getComments, isSuccess } = inject('commenter') as UseCommentType

const queryMapWithRef = computed(() => ({ ref: JSON.stringify({ from: 'frame', id: comment.value?.frame_id }) }))

const sanitizedCommentBody = computed(() =>
  p2br(sanitizeHtml(comment.value?.body ?? '')).replace(/\n/g, '<br>')
)

const onDeleteClick = async () => {
  if(comment.value) { await deleteComment(comment.value) }
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments({ fresh: true })
  }
}
</script>

<template>
  <div class="flex justify-center pt-2">
    <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-[35px]">
          <div class="flex justify-between">
            <div class="flex items-center gap-1">
              <NuxtLink
                :to="{ path: `/users/${comment?.user_id}`, query: queryMapWithRef }"
                class="avatar"
              >
                <div class="w-5 h-5">
                  <img
                    :src="`${comment?.user_image_url}`"
                    :alt="comment?.user_name"
                    class="rounded"
                  >
                </div>
              </NuxtLink>
              <NuxtLink
                :to="{ path: `/users/${comment?.user_id}`, query: queryMapWithRef }"
                class="badge badge-outline badge-accent hover:badge-primary rounded-full"
              >
                {{ comment?.user_name }}
              </NuxtLink>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ comment?.created_at }}
              </div>
            </div>
            <div
              v-if="loggedIn && comment?.user_id == loginUser.id"
            >
              <button
                class="link link-hover"
                @click="onDeleteClick"
              >
                <i class="bi bi-x-circle text-accent hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-start items-center">
          <table class="table table-bordered table-rounded table-fixed">
            <tbody>
              <tr>
                <td class="break-words">
                  <span v-html="sanitizedCommentBody" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
