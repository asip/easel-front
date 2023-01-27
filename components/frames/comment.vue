<template>
  <div v-if="logged_in" class="card">
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
          <button class="btn btn-light col-12 form-control" v-on:click="onCommentClick">投稿</button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Frame } from '~/composables/use_frame'

  const emits = defineEmits<{(e: 'change'): void}>()

  const { logged_in } = useLoginUser()
  const { comments,comment, setComment , createComment, error_messages, getComments } = useComment()

  const frame: Frame | undefined = inject('frame')

  comment.frame_id = frame?.id;

  const onCommentClick = async () => {
    setComment(comment)
    await createComment()
    if(error_messages.length == 0){
      emits('change')
    }
  }
</script>