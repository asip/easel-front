<template>
  <div v-show="logged_in" class="card">
    <div class="card-header">
      <div class="d-flex justify-content-sm-center">
        <div class="clearfix">
          <div class="float-left">
            コメント
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <br>
      <div class="d-flex justify-content-center">
        <div class="form-group col-10">
          <textarea v-model="comment.body" class="form-control col-12"></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-10">
          <div v-for="message in error_messages">
            <p style="color: red;">{{message}}</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-group col-10">
          <button class="btn btn-light col-12 form-control" v-on:click="setComment">投稿</button>
        </div>
      </div>
      <br>
    </div>
  </div>
  <br>
  <div v-for="comment in comments">
    <div class="card">
      <div class="card-block">
        <div class="row d-flex">
          <div class="col-12" style="line-height: 35px;">
            <div class="float-start align-middle" style="padding-left:5px;">
              <img :src="`${baseURL}${comment.attributes.user_image_url}`" class="rounded" width="20" height="20">
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">{{comment.attributes.user_name}}</div>
            </div>
            <div class="float-start small align-middle" style="padding-left:5px;">
              <div class="badge rounded-pill bg-light text-info">{{comment.attributes.updated_at}}</div>
            </div>
            <div class="float-end" v-show="logged_in && comment.attributes.user_id == login_user.id">
              <button class="btn btn-link btn-sm" v-on:click="deleteComment(comment)">削除</button>&nbsp;
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
  <br>
</template>

<script setup lang="ts">
  import sanitizeHtml from 'sanitize-html'

  import { Frame } from '~/composables/use_frame'
  import { useComment } from '~/composables/use_comment'
  import { useConstants } from '~/composables/use_constants'

  const { logged_in, login_user } = useLoginUser()

  const { comment, comments, error_messages ,getComments, setComment, deleteComment} = useComment();

  const { baseURL } = useConstants()

  const frame: Frame | undefined = inject('frame')

  const getSanitizedCommentBody = (row: any): string => {
    return sanitizeHtml(row.attributes.body).replace(/\n/g, '<br>');
  };

  onMounted(async () => {
    comment.frame_id = frame?.id;
    //console.log(comment.frame_id);
    await getComments();
  });
</script>
