import type { Frame, User } from '~/interfaces'

export function useImagePreview (target: HTMLInputElement, model: Frame | User) {
  const file: { name?: string, ext?: string, data?: Blob | null } = {}
  file.name = target.value
  file.ext = file.name?.replace(/^.*\./, '').toLowerCase()
  // (アップロードされたデータを取得して変数file.dataに代入します)
  file.data = target.files![0]
  // console.log(file.data)

  if ('file' in model) {
    model.file = file.data
  } else if ('image' in model) {
    model.image = file.data
  }

  // console.log(file.name)
  if (file.ext?.match(/^(jpeg|jpg|png|gif)$/)) {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      model.preview_url = image?.toString()
    }
    // (DataURIScheme文字列を取得します)
    if (file.data) reader.readAsDataURL(file.data)
  }
}
