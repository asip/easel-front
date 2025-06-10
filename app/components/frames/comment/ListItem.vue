<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import type { UseCommentType } from '~/composables/use-comment'
import type { Comment } from '~/interfaces/comment'

const comment = defineModel<Comment>()

const { p2br } = useQuill()
const { setFlash } = useToast()
const { loggedIn, loginUser } = useAccount()
const { deleteComment, flash, getComments, isSuccess } = inject('commenter') as UseCommentType

const sanitizedCommentBody = computed(() => {
  return p2br(sanitizeHtml(comment.value?.body ?? '')).replace(/\n/g, '<br>')
})

const onDeleteClick = async () => {
  if(comment.value) { await deleteComment(comment.value) }
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments()
  }
}
</script>

<template>
  <div class="flex justify-center pt-2">
    <div class="card bg-base-100 shadow shadow-sm rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-[35px]">
          <div class="flex justify-between">
            <div class="flex items-center gap-1">
              <div class="avatar">
                <div class="w-5 h-5 rouded-full">
                  <img
                    :src="`${comment?.user_image_url}`"
                    alt=""
                  >
                </div>
              </div>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ comment?.user_name }}
              </div>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ comment?.updated_at }}
              </div>
            </div>
            <div
              v-show="loggedIn && comment?.user_id == loginUser.id"
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
          <span v-html="sanitizedCommentBody" />
        </div>
      </div>
    </div>
  </div>
</template>
