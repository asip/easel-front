<template>
  <div class="card-block">
    <div class="row d-flex justify-content-sm-center">
      <label for="name" class="col-form-label col-sm-3">{{ $t('model.frame.name') }}：</label>
      <div class="col-sm-4">
        <input type="text" v-model="frame.name" :placeholder="$t('model.frame.name')" class="form-control">
        <div v-for="error of v$.name.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="tag_list" class="col-form-label col-sm-3">{{ $t('model.frame.tag_list') }}：</label>
      <div class="col-sm-4">
        <input type="text" name="tag_editor" id="tag_editor" value="" class="form-control" >
        <input type="hidden" id="tag_list" v-model="frame.tag_list">
        <div v-for="error of v$.tags.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="comment" class="col-form-label col-sm-3">{{ $t('model.frame.shooted_at') }}：</label>
      <div class="col-sm-4">
        <input type="datetime-local" v-model="frame.shooted_at" class="form-control">
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="comment" class="col-form-label col-sm-3">{{ $t('model.frame.comment') }}：</label>
      <div class="col-sm-4">
        <textarea v-model="frame.comment" class="form-control"></textarea>
      </div>
    </div>
    <br>
  </div>
  <div class="card-footer">
    <div class="d-flex justify-content-sm-center">
      <div class="col-sm-6">
        <button type="button" class="btn btn-primary" @click="onEditClick">{{ $t('action.model.update') }}</button>&nbsp;
        <NuxtLink :to="`/frames/${frame?.id}`" class="btn btn-outline-secondary">{{ $t('action.model.return') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Tagify from '@yaireo/tagify'

  const { frame, v$, updateFrame, isSuccess } = inject('framer') as any

  //console.log(frame)
  //console.log(frame.tags)
  //console.log(frame.tag_list)

  const onEditClick = async () => {
    await updateFrame()
    if(!v$.value.$invalid && isSuccess()){
      navigateTo(`/frames/${frame?.id}`)
    }
  }

  onMounted(() => {
    //console.log(frame)

    const elm_te: HTMLInputElement | null = document.querySelector('#tag_editor')

    if(elm_te) {
      const tag_editor = new Tagify(elm_te, {
        maxTags: 5,
        dropdown: {
          classname: "color-blue",
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      })

      tag_editor.removeAllTags();
      if(frame?.tags){
        tag_editor.addTags(frame?.tags);
      }

      const saveTagList = () => {
        if(frame) {
          frame.tags = tag_editor.value.map(v => v.value)
          frame.tag_list = frame.tags?.join(",");
        }
      }

      tag_editor.on('add', () => saveTagList());
      tag_editor.on('remove', () => saveTagList());
    }
  })
</script>