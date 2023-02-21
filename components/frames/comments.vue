<template>
  <div v-for="comment in comments">
    <div class="card">
      <div class="card-block">
        <div class="row d-flex">
          <div class="col-12" style="line-height: 35px;">
            <div class="float-start align-middle" style="padding-left:5px;">
              <img :src="`${baseURL}${comment.user_image_url}`" class="rounded" width="20" height="20">
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">{{ comment.user_name }}</div>
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">{{ comment.updated_at }}</div>
            </div>
            <div class="float-end" v-show="logged_in && comment.user_id == login_user.id">
              <button class="btn btn-link btn-sm" v-on:click="onDeleteClick(comment)">{{ $t('action.model.delete') }}</button>&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex">
          <div class="col-12 align-middle">
            <div class="float-start">
              <span v-html="getSanitizedCommentBody(comment)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
  import sanitizeHtml from 'sanitize-html'
  import { useConstants } from '~/composables/use_constants'
  import { Comment } from '~/composables/use_comment'

  const emits = defineEmits<{(e: 'change'): void}>()

  const { logged_in, login_user } = useLoginUser()

  const { deleteComment, error_messages } = useComment()
  const { baseURL } = useConstants()

  const comments: Comment[] | undefined = inject('comments')

  const getSanitizedCommentBody = (row: Comment): string => {
    return sanitizeHtml(row.body).replace(/\n/g, '<br>');
  };

  const onDeleteClick = async (comment: Comment) => {
    await deleteComment(comment)
    if(error_messages.length == 0){
      emits('change')
    }
  }
</script>