type useImagePreviewOptions = {
  target: HTMLInputElement, file: Ref<File | undefined| null>, previewUrl: Ref<string | null | undefined>
}

export function useImagePreview ({ target, file, previewUrl }: useImagePreviewOptions): void {
  // let blob: Blob | null| undefined
  // (アップロードされたデータを取得して変数file.valueに代入します)
  file.value = target.files?.item(0)
  // console.log(file.value?.name)
  // console.log(file?.type)
  // file.ext = file.?.name?.replace(/^.*\./, '').toLowerCase()
  /* if (file.value) {
    const buffer = await file.value.arrayBuffer()
    blob = new Blob([buffer], { type: file.value.type })
  } */
  if (file.value?.type?.match(/^image\/(jpeg|jpg|png|gif)$/)) {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      // console.log(image?.toString())
      previewUrl.value = image?.toString()
    }
    // (DataURIScheme文字列を取得します)
    // if (blob) reader.readAsDataURL(blob)
    reader.readAsDataURL(file.value)
  } else {
    previewUrl.value = null
  }
}
