<template>
  <div v-if="logged_in" class="card">
    <div class="card-header">
      <div class="d-flex justify-content-sm-center">
        <div class="clearfix">
          <div class="float-left">
            {{ $t('model.comment.model_name') }}
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
          <button class="btn btn-light col-12 form-control" v-on:click="onCommentClick">{{ $t('action.comment.post') }}</button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { logged_in } = useLoginUser()
  const { comment, createComment, error_messages } = inject('commenter') as any

  const { frame } = inject('framer') as any

  comment.frame_id = frame?.id;

  const onCommentClick = async () => {
    await createComment()
  }
</script>