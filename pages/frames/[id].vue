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
        <label for="name" class="col-form-label col-sm-3">{{ $t('model.frame.name') }}：</label>
        <div class="col-sm-4">
          <div class="form-control-plaintext">{{ frame.name }}</div>
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center">
        <label for="name" class="col-form-label col-sm-3">{{ $t('model.frame.shooted_at') }}：</label>
        <div class="col-sm-4">
          <div class="form-control-plaintext">{{ frame.shooted_at }}</div>
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center" >
        <label for="comment" class="col-form-label col-sm-3">{{ $t('model.frame.comment') }}：</label>
        <div class="col-sm-4">
          <div class="form-control-plaintext">{{ frame.comment }}</div>
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
    <div v-if="logged_in && frame.user_id == login_user.id" class="card-footer">
      <div class="row d-flex justify-content-sm-center">
        <div class="form-group col-sm-6">
          <NuxtLink :to="`/frames/frame-${frame.id}/edit`" class="btn btn-primary">{{ $t('action.model.update') }}</NuxtLink>&nbsp;
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">{{ $t('action.model.delete') }}</button>
        </div>
      </div>
    </div>
    <div v-else class="card-block">
      <div class="row d-flex justify-content-sm-center">
        <br>
      </div>
    </div>
  </div>
  <FramesDeleteModal />
  <br>
  <FrameComments />
</template>

<script setup lang="ts">

  const route = useRoute();
  const { id  } = route.params;

  const { frame_query } = useFrameSearch()
  const { logged_in, login_user } = useLoginUser()
  const framer = useFrame()
  const { frame, getFrame } = framer

  provide('framer', framer)

  await getFrame(id as string)
</script>