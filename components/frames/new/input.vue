<template>
  <div class="card-body">
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-7">
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr>
              <td style="width: 20%;">
                <label for="file" class="col-form-label">{{ $t('model.frame.file') }}：</label>
              </td>
              <td style="width: 80%;">
                <input type="file" accept="image/jpg,image/jpeg,image/png" class="form-control-file" @change="onSelectFile">
                <div v-for="(message, idx) in error_messages.file" :key="idx">
                  <div>{{ message }}</div>
                </div>
              </td>
            </tr>
            <tr v-if="frame.file !== null">
              <td colspan="2">
                <ImagePreview />
              </td>
            </tr>
            <tr>
              <td>
                <label for="name" class="col-form-label">{{ $t('model.frame.name') }}：</label>
              </td>
              <td>
                <input v-model="frame.name" type="text" :placeholder="$t('model.frame.name')" class="form-control">
                <div v-for="error of v$.name.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="tag_list" class="col-form-label">{{ $t('model.frame.tag_list') }}：</label>
              </td>
              <td>
                <input ref="tagEditorRef" type="text" name="tag_editor" value="" class="form-control">
                <input id="tag_list" v-model="frame.tag_list" type="hidden">
                <div v-for="error of v$.tags.$errors" :key="error.$uid">
                  <div>{{ error.$message }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label for="comment" class="col-form-label">{{ $t('model.frame.shooted_at') }}：</label>
              </td>
              <td>
                <input v-model="frame.shooted_at" type="datetime-local" class="form-control">
              </td>
            </tr>
            <tr>
              <td>
                <label for="comment" class="col-form-label">{{ $t('model.frame.comment') }}：</label>
              </td>
              <td>
                <textarea v-model="frame.comment" class="form-control" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <div class="d-flex justify-content-sm-center">
      <div class="col-sm-7">
        <button type="button" class="btn btn-primary" :disabled="processing" @click="onCreateClick">
          {{ $t('action.model.create') }}
        </button>&nbsp;
        <NuxtLink :to="`/`" class="btn btn-outline-secondary">
          {{ $t('action.model.return') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import Tagify from '@yaireo/tagify'

const { setFlash } = useToast()
const { login_user } = useLoginUser()
const { frame, frm_rules, frameId, createFrame, error_messages, processing, isSuccess, flash, locale } = inject('framer') as any

const v$ = useVuelidate(frm_rules, frame)

const tagEditorRef = ref(null)

// console.log(frame)
// console.log(frame.tags)
// console.log(frame.tag_list)

provide('model', frame)

const onSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  frame.file = target.files![0]

  const file: { name?: string, ext?: string, data?: Blob | null } = {}
  file.name = target.value
  file.ext = file?.name?.replace(/^.*\./, '').toLowerCase()
  // console.log(file.name)
  if (file?.ext?.match(/^(jpeg|jpg|png|gif)$/)) {
    // .file_filedからデータを取得して変数file.dataに代入します
    file.data = frame?.file
    // console.log(file.data)
    // FileReaderオブジェクトを作成します
    const reader = new FileReader()
    // 読み込みが完了したら処理が実行されます
    reader.onload = function () {
      // 読み込んだファイルの内容を取得して変数imageに代入します
      const image: string | ArrayBuffer | null = reader.result
      if (frame) {
        frame.preview_url = image as string
      }
    }
    // DataURIScheme文字列を取得します
    if (file?.data) {
      reader.readAsDataURL(file?.data)
    }
    // preview.src = URL.createObjectURL(file.data)
    // プレビュー画像がなければ表示します
  }
}

const onCreateClick = async () => {
  // @ts-ignore
  i18n.global.locale.value = locale.value
  await v$.value.$validate()

  // console.log(frame)
  if (!v$.value.$invalid) {
    await createFrame()
    setFlash(flash.value)
    if (isSuccess()) {
      navigateTo(`/frames/${frameId.value}`)
    } else if (!login_user.value.id) {
      navigateTo('/')
    }
  }
}

onMounted(() => {
  // console.log(frame)

  const elmTe: HTMLInputElement | null = tagEditorRef.value

  if (elmTe) {
    const tag_editor = new Tagify(elmTe, {
      maxTags: 5,
      dropdown: {
        classname: 'color-blue',
        enabled: 0,
        maxItems: 30,
        closeOnSelect: false,
        highlightFirst: true
      }
    })

    tag_editor.removeAllTags()
    if (frame?.tags) {
      tag_editor.addTags(frame?.tags)
    }

    const saveTagList = () => {
      if (frame) {
        frame.tags = tag_editor.value.map(v => v.value)
        frame.tag_list = frame.tags?.join(',')
      }
    }

    tag_editor.on('add', () => saveTagList())
    tag_editor.on('remove', () => saveTagList())
  }
})
</script>
