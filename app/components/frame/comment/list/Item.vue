<script setup lang="ts">
import type { Comment } from '~/interfaces'
import type { RefQuery } from '~/types'

const { setFlash } = useSonner()
const { loggedIn, loginUser } = useAccount()

const commenter = useComment()
const { comment, deleteComment, flash, isSuccess, set404Alert, processing, setComment } = commenter

const { getComments } = useComments()

const edit = ref<boolean>(false)

const commentModel = defineModel<Comment>()

const form = useTemplateRef('form')

const queryMapWithRef = computed<RefQuery>(() => ({ ref: JSON.stringify({ from: 'frame' }) }))

provide('commenter', commenter)
provide('edit', edit)

comment.value.frame_id = commentModel.value?.frame_id

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
    form.value?.redirectOrReload404()
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
              <NuxtLink
                :to="{ path: `/users/${commentModel?.user_id}`, query: queryMapWithRef }"
                class="avatar"
              >
                <div class="w-5 h-5">
                  <img
                    :src="`${commentModel?.user_image_url}`"
                    :alt="commentModel?.user_name"
                    class="rounded"
                  >
                </div>
              </NuxtLink>
              <NuxtLink
                :to="{ path: `/users/${commentModel?.user_id}`, query: queryMapWithRef }"
                class="badge badge-outline badge-accent hover:badge-primary rounded-full"
              >
                {{ commentModel?.user_name }}
              </NuxtLink>
              <div class="badge badge-outline badge-accent rounded-full">
                {{ commentModel?.created_at }}
              </div>
            </div>
            <div v-if="loggedIn && commentModel?.user_id == loginUser.id" class="flex gap-1">
              <button v-if="!edit" class="link link-hover" @click="onEditClick">
                <i class="bi bi-pencil-square text-accent hover:text-primary" />
              </button>
              <button v-else class="link link-hover" @click="onCancelClick">
                <i class="bi bi-arrow-left-circle text-accent hover:text-primary" />
              </button>
              <button class="link link-hover" :disabled="processing" @click="onDeleteClick">
                <i class="bi bi-x-circle text-accent hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="!edit" class="flex justify-start items-center">
          <FrameCommentListDetail v-model="commentModel" />
        </div>
        <form v-else>
          <FrameCommentEditForm ref="form" v-model="commentModel" />
        </form>
      </div>
    </div>
  </div>
</template>
