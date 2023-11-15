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
      <form>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10">
            <textarea v-model="comment.body" class="form-control col-12" />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="col-10">
            <div v-for="error of v$.body.$errors" :key="error.$uid">
              <div style="color: red;">
                {{ error.$message }}
              </div>
            </div>
            <div v-for="(message, idx) in error_messages.body" :key="idx">
              <p style="color: red;">
                {{ $t('model.comment.body') }}{{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10">
            <button type="button" class="btn btn-light col-12 form-control" @click="onCommentClick">
              {{ $t('action.comment.post') }}
            </button>
          </div>
        </div>
      </form>
      <br>
    </div>
  </div>
  <br v-if="logged_in">
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'

const { logged_in } = useLoginUser()
const { comment, cm_rules, error_messages, isSuccess, locale, getComments, createComment } = inject('commenter') as any

const v$ = useVuelidate(cm_rules, comment)

const { login_user } = useLoginUser()
const { frame } = inject('framer') as any

comment.frame_id = frame?.id

const onCommentClick = async () => {
  // @ts-ignore
  i18n.global.locale.value = locale.value
  v$.value.$reset()
  await v$.value.$validate()

  // console.log(v$.value.body.$invalid)
  // console.log(v$.value.$invalid)
  // console.log(v$.value.$error)
  // console.log(v$.value.$errors)
  // console.log(comment.body)

  if (!v$.value.body.$invalid) {
    await createComment()
    if (isSuccess()) {
      v$.value.$reset()
      await getComments()
    } else if (!login_user.value.id) {
      navigateTo('/')
    }
  }
}
</script>
