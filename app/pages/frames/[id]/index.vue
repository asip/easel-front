<script setup lang="ts">
import type { RefQuery } from '~/interfaces'

import sanitizeHtml from 'sanitize-html'

const route = useRoute()
const { id } = route.params
const frameId = id?.toString()
const ref = route.query.ref
const refItems: RefQuery = ref ? JSON.parse(ref.toString()) : {}

const { p2br } = useQuill()
const { queryString } = useFrameSearch()
const { loggedIn, loginUser } = useAccount()
const framer = useFrame()
const { frame, getFrame } = framer
const { openModal } = useModal()
const { formatHTML } = useDatetimeLocalFormat()

provide('framer', framer)

await getFrame(`${frameId}`)

const sanitizedComment = computed(() => {
  return p2br(sanitizeHtml(frame.value.comment)).replace(/\n/g, '<br>')
})

const onPageBack = async () => {
  if (refItems.from === 'profile') {
    await navigateTo({ path: '/account/frames' })
  } else if (refItems.from === 'user_profile') {
    await navigateTo({ path: `/users/${refItems.id}` })
  } else {
    await navigateTo({ path: '/', query: queryString.value })
  }
}

const onDeleteClick = () => {
  openModal('#delete_frame_modal')
}
</script>

<template>
  <div>
    <br>
    <div class="flex justify-center">
      <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
        <div class="card-body">
          <div class="flex justify-between">
            <div class="flex gap-1">
              <span @click="onPageBack">
                <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
              </span>
              <NuxtLink
                v-if="loggedIn && frame.user_id == loginUser.id"
                :to="`/frames/${frame.id}/edit`"
              >
                <i class="bi bi-pencil-square text-accent hover:text-primary" />
              </NuxtLink>
              <!-- Button trigger modal -->
              <button
                v-if="loggedIn && frame.user_id == loginUser.id"
                type="button"
                class="btn-icon-local"
                @click="onDeleteClick"
              >
                <i class="bi bi-x-circle text-accent hover:text-primary" />
              </button>
            </div>
            <div>
              <NuxtLink
                :to="{ path: `/users/${frame.user_id}`, query: { ref: JSON.stringify({ from: 'frame', id: frameId }) } }"
                class="link link-hover"
              >
                {{ frame.user_name }}
              </NuxtLink>
            </div>
          </div>
          <FramesPreviewImage
            v-model="frame"
            :original="true"
            :photoswipe="true"
          />
          <FramesPreviewTags v-model="frame" />
          <div class="flex justify-center">
            <table class="table table-bordered table_rounded ml-2 mr-2 ">
              <tbody>
                <tr>
                  <td style="width: 9em;">
                    {{ $t('model.frame.name') }}：
                  </td>
                  <td>
                    {{ frame.name }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('model.frame.creator_name') }}：</td>
                  <td>
                    {{ frame.creator_name }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('model.frame.shooted_at') }}：</td>
                  <td>
                    {{ formatHTML(frame.shooted_at) }}
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
          <div class="flex justify-between">
            <div>
              {{ frame.created_at }}
            </div>
            <div>
              {{ frame.updated_at }}
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
