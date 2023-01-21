<template>
  <div class="card-block">
    <div class="row d-flex justify-content-sm-center">
      <label for="name" class="col-form-label-sm col-sm-2">名前：</label>
      <div class="col-sm-4">
        <input type="text" v-model="frame.name" placeholder="名前" class="form-control">
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="tag_list" class="col-form-label-sm col-sm-2">タグ：</label>
      <div class="col-sm-4">
        <input type="text" name="tag_editor" id="tag_editor" value="" class="form-control" >
        <input type="hidden" id="tag_list" v-model="frame.tag_list">
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="comment" class="col-form-label-sm col-sm-2">撮影日時：</label>
      <div class="col-sm-4">
        <input type="datetime-local" v-model="frame.shooted_at" class="form-control">
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="comment" class="col-form-label-sm col-sm-2">コメント：</label>
      <div class="col-sm-4">
        <textarea v-model="frame.comment" class="form-control"></textarea>
      </div>
    </div>
    <br>
  </div>
  <div class="card-footer">
    <div class="d-flex justify-content-sm-center">
      <div class="col-sm-6">
        <button type="button" class="btn btn-primary" @click="onEditClick">編集</button>&nbsp;
        <NuxtLink :to="`/frames/${frame?.id}`" class="btn btn-outline-secondary">戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Tagify from '@yaireo/tagify'
  import { Frame } from '~/composables/use_frame';

  const frame: Frame | undefined = inject('frame')

  //const base_url = "http://localhost:3000"

  //console.log(frame.tags)
  //console.log(frame.tag_list)

  const onEditClick = () => {
    console.log(frame)
  }

  onMounted(() => {
    //console.log(frame)

    const elm_te = document.querySelector('#tag_editor')

    const tag_editor = new Tagify(elm_te, {
      maxTags: 5,
      dropdown: {
        classname: "color-blue",
        enabled: 0,
        maxItems: 30,
        closeOnSelect: false,
        highlightFirst: true,
      }
    });

    tag_editor.removeAllTags();
    tag_editor.addTags(frame?.tags);

    const saveTagList = (tagify: Tagify) => {
      frame.tags = tag_editor.value.map(v => v.value)
      frame.tag_list = frame.tags.join(",");
    }

    tag_editor.on('add', e => saveTagList(e.detail.tagify));
    tag_editor.on('remove', e => saveTagList(e.detail.tagify));
  })
</script>