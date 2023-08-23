<template>
  <div v-for="(comment, idx) in comments as Comment[]" :key="comment.id">
    <div class="card">
      <div class="card-block">
        <div class="row d-flex">
          <div class="col-12" style="line-height: 35px;">
            <div class="float-start align-middle" style="padding-left:5px;">
              <img
                :src="`${backendOriginURL}${comment.user_image_url}`"
                alt=""
                class="rounded"
                width="20"
                height="20"
                decoding="async"
              >
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">
                {{ comment.user_name }}
              </div>
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">
                {{ comment.updated_at }}
              </div>
            </div>
            <div v-show="logged_in && comment.user_id == login_user.id" class="float-end">
              <button class="btn btn-link btn-sm" @click="onDeleteClick(comment, idx)">
                {{ $t('action.model.delete') }}
              </button>&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer" style="background-color: white; border-color: white;">
        <div class="d-flex">
          <div class="col-12 align-middle">
            <div class="float-start">
              <span v-html="getSanitizedCommentBody(comment)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import { useConstants } from '~/composables/use_constants'
import { Comment } from '~/interfaces/comment'

const { logged_in, login_user } = useLoginUser()

const { comments, deleteComment } = inject('commenter') as any
const { backendOriginURL } = useConstants()

const getSanitizedCommentBody = (row: Comment): string => {
  return sanitizeHtml(row.body).replace(/\n/g, '<br>')
}

const onDeleteClick = async (comment: Comment, idx: number) => {
  await deleteComment(comment, idx)
}
</script>
