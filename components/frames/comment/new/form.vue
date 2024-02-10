<template>
  <br v-if="logged_in">
  <div v-if="logged_in" class="card col-sm-8 mx-auto">
    <div class="card-block">
      <div class="row d-flex">
        <div class="clearfix " style="line-height: 35px;">
          <div class="float-start" style="padding-left:5px;">
            <img
              :src="`${login_user.image_thumb_url}`"
              alt=""
              class="rounded"
              width="20"
              height="20"
              decoding="async"
            >
          </div>
          <div class="float-start small align-middle" style="padding-left:5px;">
            <div class="badge rounded-pill bg-light text-info">
              {{ login_user.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <form>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10">
            <textarea v-model="comment.body" class="form-control col-12" />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="col-sm-10">
            <div v-for="error of v$.body.$errors" :key="error.$uid">
              <div class="text-danger">
                {{ error.$message }}
              </div>
            </div>
            <div v-for="(message, idx) in error_messages.body" :key="idx">
              <p class="text-danger">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="form-group col-10" style="padding-bottom:10px;">
            <button type="button" class="btn btn-light form-control" :disabled="processing" @click="onCommentClick">
              {{ $t('action.comment.post') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useToast } from '~/composables/ui/use_toast'
import type { UseCommentType } from '~/composables/use_comment'
import type { Frame } from '~/interfaces/frame';

const props = defineProps<{
  frame: Frame
}>()

const { setFlash } = useToast()
const { logged_in, login_user } = useLoginUser()
const { comment, cm_rules, error_messages, processing, isSuccess, flash, locale, getComments, createComment } = inject('commenter') as UseCommentType

const v$ = useVuelidate(cm_rules, comment)

comment.frame_id = props.frame.id

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
    setFlash(flash.value)
    if (isSuccess()) {
      v$.value.$reset()
      await getComments()
    }
  }
}
</script>
