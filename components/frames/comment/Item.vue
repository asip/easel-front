<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import { useToast } from '~/composables/ui/use-toast'
import type { UseCommentType } from '~/composables/use-comment'
import type { Comment } from '~/interfaces/comment'

const comment = defineModel<Comment>()

const { setFlash } = useToast()
const { logged_in, login_user } = useLoginUser()
const { deleteComment, flash, getComments, isSuccess } = inject('commenter') as UseCommentType

const sanitizedCommentBody = computed(() => {
  return sanitizeHtml(comment.value?.body ?? '').replace(/\n/g, '<br>')
})

const onDeleteClick = async () => {
  comment.value && await deleteComment(comment.value)
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments()
  }
}
</script>

<template>
  <div class="card col-sm-8 mx-auto">
    <div class="card-block">
      <div class="row d-flex">
        <div
          class="col-sm-12"
          style="line-height: 35px;"
        >
          <div
            class="float-start align-middle"
            style="padding-left:5px;"
          >
            <img
              :src="`${comment?.user_image_url}`"
              alt=""
              class="rounded"
              width="20"
              height="20"
              decoding="async"
            >
          </div>
          <div
            class="float-start small align-middle"
            style="padding-left:5px;"
          >
            <div class="badge rounded-pill bg-light text-info">
              {{ comment?.user_name }}
            </div>
          </div>
          <div
            class="float-start small align-middle"
            style="padding-left:5px;"
          >
            <div class="badge rounded-pill bg-light text-info">
              {{ comment?.updated_at }}
            </div>
          </div>
          <div
            v-show="logged_in && comment?.user_id == login_user.id"
            class="float-end"
          >
            <button
              class="btn btn-link btn-sm"
              @click="onDeleteClick"
            >
              <i class="bi bi-x-circle" />
            </button>&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div
      class="card-footer"
      style="background-color: white; border-color: white;"
    >
      <div class="d-flex">
        <div class="col-12 align-middle">
          <div class="float-start">
            <span v-html="sanitizedCommentBody" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
