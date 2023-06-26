<template>
  <div>
    <br>
    <div class="card">
      <div class="card-block">
        <div class="row d-flex">
          <div class="col-12 clearfix">
            <div class="float-start">
            &nbsp;
              <NuxtLink :to="{ path: '/' , query: { q: frame_query.word, page: frame_query.page } }">
                <i class="bi bi-arrow-left-circle" />
              </NuxtLink>
            </div>
            <div class="float-end">
              {{ frame.updated_at }}&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <FramesPreviewImage :original="true" :photoswipe="true" />
        <FramesPreviewTags />
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-sm-center">
          <div class="col-sm-7">
            <table class="table table-bordered table_rounded">
              <tbody>
                <tr>
                  <td style="width:20%;">
                    {{ $t('model.frame.name') }}：
                  </td>
                  <td style="width:80%;">
                    {{ frame.name }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('model.frame.shooted_at') }}：</td>
                  <td>
                    {{ frame.shooted_at }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('model.frame.comment') }}：</td>
                  <td>
                    <span v-html="sanitizedComment" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-sm-12 clearfix">
            <!-- <div class="float-start"></div> -->
            <div class="float-end">
              <NuxtLink :to="`/users/${frame.user_id}`" class="text-decoration-none">
                {{ frame.user_name }}&nbsp;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div v-if="logged_in && frame.user_id == login_user.id" class="card-footer">
        <div class="row d-flex justify-content-sm-center">
          <div class="form-group col-sm-6">
            <NuxtLink :to="`/frames/frame-${frame.id}/edit`" class="btn btn-primary">
              {{ $t('action.model.update') }}
            </NuxtLink>&nbsp;
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">
              {{ $t('action.model.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <FramesDeleteModal />
    <br>
    <FrameComments />
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const route = useRoute()
const { id } = route.params

const { frame_query } = useFrameSearch()
const { logged_in, login_user } = useLoginUser()
const framer = useFrame()
const { frame, getFrame } = framer

provide('framer', framer)

await getFrame(id as string)

const sanitizedComment = computed(() => {
  return sanitizeHtml(frame.comment).replace(/\n/g, '<br>')
})
</script>
