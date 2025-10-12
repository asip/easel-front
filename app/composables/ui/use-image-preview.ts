import type { Frame, User } from '~/interfaces'

type useImagePreviewOptions = {
  target: HTMLInputElement, model: Frame | User
}

export async function useImagePreview ({ target, model } : useImagePreviewOptions) {
  const file: { data?: File | null, blob?: Blob | null } = {}
  // (アップロードされたデータを取得して変数file.dataに代入します)
  file.data = target.files?.item(0)
  // console.log(file.data?.name)
  // console.log(file.data?.type)
  // file.ext = file.data?.name?.replace(/^.*\./, '').toLowerCase()
  if (file.data) {
    const buffer = await file.data.arrayBuffer()
    file.blob = new Blob([buffer], { type: file.data.type })
  }
  // console.log(file.data)

  if ('file' in model) {
    model.file = file.data
  } else if ('image' in model) {
    model.image = file.data
  }

  // console.log(file.name)
  if (file.data?.type?.match(/^image\/(jpeg|jpg|png|gif)$/)) {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      model.preview_url = image?.toString()
    }
    // (DataURIScheme文字列を取得します)
    if (file.blob) reader.readAsDataURL(file.blob)
  } else {
    model.preview_url = null
  }
}
