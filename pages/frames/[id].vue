<template>
  <div>
    <br>
    <div class="card">
      <div class="card-block">
        <div class="row d-flex">
          <div class="col-12 clearfix">
            <div class="float-start">
            &nbsp;
              <span @click="onPageBack"><i class="bi bi-arrow-left-circle" /></span>
              <NuxtLink v-if="logged_in && frame.user_id == login_user.id" :to="`/frames/frame-${frame.id}/edit`">
                <i class="bi bi-pencil-square" />
              </NuxtLink>
              <!-- Button trigger modal -->
              <button
                v-if="logged_in && frame.user_id == login_user.id"
                type="button"
                class="btn-icon-local"
                data-bs-toggle="modal"
                data-bs-config="{backdrop:true}"
                data-bs-target="#delete_modal"
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
    <FrameComments />
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const route = useRoute()
const { id } = route.params
const ref_page = route.query.ref
const ref_id = route.query.ref_id

const router = useRouter()

const { frame_query } = useFrameSearch()
const { logged_in, login_user } = useLoginUser()
const framer = useFrame()
const { frame, getFrame } = framer

provide('framer', framer)

const frame_id = id as string

await getFrame(frame_id)

const sanitizedComment = computed(() => {
  return sanitizeHtml(frame.comment).replace(/\n/g, '<br>')
})

const onPageBack = () => {
  if (ref_page === 'profile') {
    router.push({ path: '/account/profile' })
  } else if (ref_page === 'user_profile') {
    router.push({ path: `/users/${ref_id}` })
  } else {
    router.push({ path: '/', query: { q: frame_query.value.word, page: frame_query.value.page } })
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
