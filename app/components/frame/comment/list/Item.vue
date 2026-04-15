<script setup lang="ts">
import type { Comment, RefQueryItems } from '~/types'

const { setFlash } = useSonner()
const { loggedIn, account } = useAccount()

const commentUse = useComment()
const {
  comment,
  deleteComment,
  flash,
  isSuccess,
  backendErrorInfo,
  set404Alert,
  processing,
  setComment,
} = commentUse
const { getComments } = useComments()
const { redirectOrReload404 } = useCommentTransition(comment)

const { refItems } = useCookieStore()

const edit = ref<boolean>(false)

const commentModel = defineModel<Comment>()

const queryMapWithRef = computed<RefQueryItems>(() => ({ ref: JSON.stringify({ from: 'frame' }) }))

provide('commentUse', commentUse)

comment.value.frame_id = commentModel.value?.frame_id

const onUserClick = async (): Promise<void> => {
  refItems.value = queryMapWithRef.value.ref
  await navigateTo({ path: `/users/${commentModel.value?.user_id}` })
}

const onEditClick = (): void => {
  edit.value = true
  setComment({ from: commentModel.value })
}

const onCancelClick = (): void => {
  edit.value = false
  setComment({ from: commentModel.value })
}

const onDeleteClick = async (): Promise<void> => {
  if (commentModel.value) {
    await deleteComment(commentModel.value)
  }
  set404Alert()
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments(commentModel.value?.frame_id, { cache: false })
  } else {
    redirectOrReload404(backendErrorInfo)
  }
}
</script>

<template>
  <div class="flex justify-center pt-2">
    <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 w-full sm:w-3/4">
      <div class="card-body">
        <div class="leading-8.75">
          <div class="flex justify-between">
            <div class="flex items-center gap-1">
              <NuxtLink class="avatar" @click="onUserClick">
                <div class="w-5 h-5">
                  <img
                    :src="`${commentModel?.user_image_url}`"
                    :alt="commentModel?.user_name"
                    class="rounded"
                  >
                </div>
              </NuxtLink>
              <NuxtLink
                class="badge badge-outline badge-accent hover:badge-primary rounded-full"
                @click="onUserClick"
              >
                {{ commentModel?.user_name }}
              </NuxtLink>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ commentModel?.created_at }}
              </div>
            </div>
            <div v-if="loggedIn && commentModel?.user_id == account.id" class="flex gap-1">
              <button v-if="!edit" class="link link-hover" @click="onEditClick">
                <i class="bi bi-pencil-square text-accent hover:text-primary" />
              </button>
              <button v-else class="link link-hover" @click="onCancelClick">
                <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
              </button>
              <button v-if="!edit" class="link link-hover" :disabled="processing" @click="onDeleteClick">
                <i class="bi bi-x-circle text-accent hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="!edit" class="flex justify-start items-center">
          <FrameCommentListDetail v-model="commentModel" />
        </div>
        <form v-else>
          <FrameCommentEditForm v-model:comment="commentModel" v-model:edit="edit" />
        </form>
      </div>
    </div>
  </div>
</template>
