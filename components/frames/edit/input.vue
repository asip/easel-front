<template>
  <div class="card-body">
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-10">
        <table class="table table-bordered table_rounded">
          <tbody>
            <tr>
              <td style="width: 7em;">
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
                <label for="shooted_at" class="col-form-label">{{ $t('model.frame.shooted_at') }}：</label>
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
      <div class="col-sm-10">
        <button type="button" class="btn btn-primary" :disabled="processing" @click="onEditClick">
          {{ $t('action.model.update') }}
        </button>&nbsp;
        <NuxtLink :to="`/frames/${frame?.id}`" class="btn btn-outline-secondary">
          {{ $t('action.model.return') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import Tagify from '@yaireo/tagify'
import { useToast } from '~/composables/ui/use_toast'

const { setFlash } = useToast()
const { login_user } = useLoginUser()
const { frame, frm_rules, updateFrame, processing, isSuccess, flash, locale } = inject('framer') as any

const v$ = useVuelidate(frm_rules, frame)

const tagEditorRef = ref(null)

// console.log(frame)
// console.log(frame.tags)
// console.log(frame.tag_list)

const onEditClick = async () => {
  // @ts-ignore
  i18n.global.locale.value = locale.value
  await v$.value.$validate()

  // console.log(frame)
  if (!v$.value.$invalid) {
    await updateFrame()

    setFlash(flash.value)
    if (isSuccess()) {
      navigateTo(`/frames/${frame?.id}`)
    } else if (!login_user.value.id) {
      navigateTo(`/frames/${frame?.id}`)
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
