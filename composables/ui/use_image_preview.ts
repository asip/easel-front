import type { SignupParams } from './../use_login_user'
import type { Frame } from '~/interfaces/frame'
import type { User } from '~/interfaces/user'

export function useImagePreview (target: HTMLInputElement, model: Frame | User | SignupParams) {
  if ('file' in model) {
    model.file = target.files![0]
  } else if ('image' in model) {
    model.image = target.files![0]
  }

  const file: { name?: string, ext?: string, data?: Blob | null } = {}
  file.name = target.value
  file.ext = file?.name?.replace(/^.*\./, '').toLowerCase()
  // console.log(file.name)
  if (file?.ext?.match(/^(jpeg|jpg|png|gif)$/)) {
    // (file_filedからデータを取得して変数file.dataに代入します)
    if ('file' in model) {
      file.data = model?.file
    } else if ('image' in model) {
      file.data = model?.image
    }
    // console.log(file.data)
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // 読み込みが完了したら処理が実行されます
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      if (model) {
        model.preview_url = image as string
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
