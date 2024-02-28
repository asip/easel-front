<template>
  <div>
    <br>
    <div class="card col-sm-8 mx-auto">
      <div class="card-block">
        <div class="row d-flex">
          <div class="clearfix">
            <div class="float-start">
            &nbsp;
              <span @click="onPageBack"><i class="bi bi-arrow-left-circle" /></span>&nbsp;
              <NuxtLink v-if="logged_in && frame.user_id == login_user.id" :to="`/frames/${frame.id}/edit`">
                <i class="bi bi-pencil-square" />
              </NuxtLink>&nbsp;
              <!-- Button trigger modal -->
              <button
                v-if="logged_in && frame.user_id == login_user.id"
                type="button"
                class="btn-icon-local"
                data-bs-toggle="modal"
                data-bs-config="{backdrop:true}"
                data-bs-target="#delete_frame_modal"
              >
                <i class="bi bi-x-circle" />
              </button>
            </div>
            <div class="float-end">
              {{ frame.updated_at }}&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <FramesPreviewImage v-model="frame" :original="true" :photoswipe="true" />
        <FramesPreviewTags v-model="frame" />
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-sm-center">
          <div class="col-sm-10">
            <table class="table table-bordered table_rounded">
              <tbody>
                <tr>
                  <td style="width: 7em;">
                    {{ $t('model.frame.name') }}：
                  </td>
                  <td>
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
              <NuxtLink :to="{ path: `/users/${frame.user_id}`, query: { ref: 'frame', ref_id: frame_id } }" class="text-decoration-none">
                {{ frame.user_name }}&nbsp;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FramesDeleteModal />
    <br>
    <FramesComments v-model="frame" />
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const route = useRoute()
const { id } = route.params
const ref_page = route.query.ref
const ref_id = route.query.ref_id

const { frame_query } = useFrameSearch()
const { logged_in, login_user } = useLoginUser()
const framer = useFrame()
const { frame, getFrame } = framer

provide('framer', framer)

const frame_id = id as string

await getFrame(frame_id)

const sanitizedComment = computed(() => {
  return sanitizeHtml(frame.value.comment).replace(/\n/g, '<br>')
})

const onPageBack = async () => {
  if (ref_page === 'profile') {
    await navigateTo({ path: '/account/frames' })
  } else if (ref_page === 'user_profile') {
    await navigateTo({ path: `/users/${ref_id}` })
  } else {
    await navigateTo({ path: '/', query: { q: frame_query.value.word, page: frame_query.value.page } })
  }
}
</script>

<style>
.btn-icon-local {
  padding: 0;
  background: none;
  border: none;
}
</style>
