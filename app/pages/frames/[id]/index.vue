<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

const route = useRoute()
const { id } = route.params
const frameId = id as string
const refPage = route.query.ref
const refId = route.query.ref_id

const { p2br } = useQuill()
const { queryString } = useFrameSearch()
const { loggedIn, loginUser } = useAccount()
const framer = useFrame()
const { frame, getFrame } = framer

provide('framer', framer)

await getFrame(frameId)

const sanitizedComment = computed(() => {
  return p2br(sanitizeHtml(frame.value.comment)).replace(/\n/g, '<br>')
})

const onPageBack = async () => {
  if (refPage === 'profile') {
    await navigateTo({ path: '/account/frames' })
  } else if (refPage === 'user_profile') {
    await navigateTo({ path: `/users/${refId}` })
  } else {
    await navigateTo({ path: '/', query: queryString.value })
  }
}
</script>

<template>
  <div>
    <br>
    <div class="card col-sm-8 mx-auto kadomaru m-bottom-10">
      <div class="card-block">
        <div class="row d-flex">
          <div class="clearfix">
            <div class="float-start p-left-10 p-top-10">
              <span @click="onPageBack"><i class="bi bi-arrow-left-circle" /></span>&nbsp;
              <NuxtLink
                v-if="loggedIn && frame.user_id == loginUser.id"
                :to="`/frames/${frame.id}/edit`"
              >
                <i class="bi bi-pencil-square" />
              </NuxtLink>&nbsp;
              <!-- Button trigger modal -->
              <button
                v-if="loggedIn && frame.user_id == loginUser.id"
                type="button"
                class="btn-icon-local"
                data-bs-toggle="modal"
                data-bs-config="{backdrop:true}"
                data-bs-target="#delete_frame_modal"
              >
                <i class="bi bi-x-circle" />
              </button>
            </div>
            <div class="float-end p-right-10 p-top-10">
              {{ frame.updated_at }}&nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <FramesPreviewImage
          v-model="frame"
          :original="true"
          :photoswipe="true"
        />
        <FramesPreviewTags v-model="frame" />
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
            <div class="float-end p-right-10">
              <NuxtLink
                :to="{ path: `/users/${frame.user_id}`, query: { ref: 'frame', ref_id: frameId } }"
                class="text-decoration-none"
              >
                {{ frame.user_name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FramesDeleteModal v-if="loggedIn" />
    <FramesComments v-model="frame" />
  </div>
</template>

<style>
.btn-icon-local {
  padding: 0;
  background: none;
  border: none;
}
</style>
