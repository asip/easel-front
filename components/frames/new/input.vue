<template>
  <div class="card-block">
    <div class="row d-flex justify-content-sm-center">
      <label for="file" class="col-form-label-sm col-sm-2">ファイル：</label>
      <div class="form-group col-sm-4">
        <input type="file" accept="image/jpg,image/jpeg,image/png" multiple="false" @change="onSelectFile" class="form-control-file" >
        <div v-for="message of error_messages.file">
          <div>ファイル{{ message }}</div>
        </div>
      </div>
    </div>
    <Preview />
    <div class="row d-flex justify-content-sm-center">
      <label for="name" class="col-form-label-sm col-sm-2">名前：</label>
      <div class="col-sm-4">
        <input type="text" v-model="frame.name" placeholder="名前" class="form-control">
        <div v-for="error of v$.name.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center">
      <label for="tag_list" class="col-form-label-sm col-sm-2">タグ：</label>
      <div class="col-sm-4">
        <input type="text" name="tag_editor" id="tag_editor" value="" class="form-control" >
        <input type="hidden" id="tag_list" v-model="frame.tag_list">
        <div v-for="error of v$.tags.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
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
        <button type="button" class="btn btn-primary" @click="onCreateClick">登録</button>&nbsp;
        <NuxtLink :to="`/`" class="btn btn-outline-secondary">戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Tagify from '@yaireo/tagify'
  import { Frame } from '~/composables/use_frame';

  let frame: Frame | undefined = inject('frame')

  const { v$, setFrame, createFrame, error_messages } = useFrame()

  //console.log(frame)
  //console.log(frame.tags)
  //console.log(frame.tag_list)

  provide('model', frame)

  const onSelectFile = ( event: Event ) => {
    const target = event.target as HTMLInputElement
    let uploadedFile = target.files![0];

    if(frame) {
      frame.file = uploadedFile;
    }

    const file: { name?: string, ext?: string, data?: Blob | null | undefined } = {};
    file.name = target.value;
    file.ext = file?.name?.replace(/^.*\./, '').toLowerCase();
    //console.log(file.name)
    if (file?.ext?.match(/^(jpeg|jpg|png|gif)$/)) {
      // .file_filedからデータを取得して変数file.dataに代入します
      file.data = frame?.file
      //console.log(file.data)
      // FileReaderオブジェクトを作成します
      let reader = new FileReader()
      // 読み込みが完了したら処理が実行されます
      reader.onload = (function() {
        // 読み込んだファイルの内容を取得して変数imageに代入します
        let image: string | ArrayBuffer | null = reader.result;
        if(frame) {
          frame.preview_url = image as string
        }
      })
      // DataURIScheme文字列を取得します
      reader.readAsDataURL(file?.data)
      //preview.src = URL.createObjectURL(file.data)
      // プレビュー画像がなければ表示します
    }
  }

  const onCreateClick = async () => {
    setFrame(frame)
    await createFrame()
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
      if(frame) {
        frame.tags = tag_editor.value.map(v => v.value)
        frame.tag_list = frame.tags?.join(",");
      }
    }

    tag_editor.on('add', e => saveTagList(e.detail.tagify));
    tag_editor.on('remove', e => saveTagList(e.detail.tagify));
  })
</script>