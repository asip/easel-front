<template>
  <br>
  <div class="card">
    <div class="card-block">
      <div class="row d-flex">
        <div class="col-12 clearfix">
          <div class="float-start">
            &nbsp;<NuxtLink :to="{ path: '/' , query: { q: frame_query.word, page: frame_query.page } }"><i class="bi bi-arrow-left-circle"></i></NuxtLink>
          </div>
          <div class="float-end">
            {{ frame.updated_at }}&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <FramesPreviewImage :original="true" :spotlight="true" />
      <FramesPreviewTags />
    </div>
    <div class="card-block">
      <div class="row d-flex justify-content-sm-center">
        <label for="name" class="col-form-label-sm col-sm-2">名前：</label>
        <div class="col-sm-4">
          {{ frame.name }}
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center">
        <label for="name" class="col-form-label-sm col-sm-2">撮影日時：</label>
        <div class="col-sm-4">
          {{ frame.shooted_at }}
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center" >
        <label for="comment" class="col-form-label-sm col-sm-2 ">コメント：</label>
        <div class="col-sm-4">
          {{ frame.comment }}
        </div>
      </div>
      <div class="row d-flex" >
        <div class="col-12 clearfix">
          <!-- <div class="float-start">
          </div> -->
          <div class="float-end">
            <NuxtLink :to="`/users/${frame.user_id}`" class="text-decoration-none">
              {{ frame.user_name }}&nbsp;
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div v-if="logged_in && frame.user_id == login_user.id " class="card-footer">
      <div class="row d-flex justify-content-sm-center">
        <div class="form-group col-sm-6">
          <NuxtLink :to="`/frames/frame-${frame.id}/edit`" class="btn btn-primary">変更</NuxtLink>&nbsp;
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">削除</button>
        </div>
      </div>
    </div>
    <div v-else class="card-block">
      <div class="row d-flex justify-content-sm-center">
        <br>
      </div>
    </div>
  </div>
  <div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          削除してもよろしいですか？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">閉じる</button>
          <button class="btn btn-outline-danger" @click="onDeleteClick">削除</button>
        </div>
      </div>
    </div>
  </div>
  <br>
  <ClientOnly>
    <FrameComments />
  </ClientOnly>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js'

  const route = useRoute();
  const { id  } = route.params;

  const { frame_query } = useFrameSearch()
  const { logged_in, login_user } = useLoginUser()
  const { frame, getFrame, deleteFrame } = useFrame()

  provide('frame', frame)

  await getFrame(id as string)

  const removeBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop')
    backdrop?.remove()
  }

  const onDeleteClick = async () => {
    await deleteFrame()
    removeBackdrop()
    navigateTo('/')
  }
</script>