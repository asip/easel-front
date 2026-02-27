type useImagePreviewOptions = {
  file: Ref<File | null | undefined>
  previewUrl: Ref<string | null | undefined>
}

export function useImagePreview({ file, previewUrl }: useImagePreviewOptions): void {
  const setPreview = (): void => {
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      // console.log(image?.toString())
      previewUrl.value = image?.toString() ?? null
    }
    // (DataURIScheme文字列を取得します)
    // if (blob) reader.readAsDataURL(blob)
    if (file.value) reader.readAsDataURL(file.value)
  }

  const previewImage = () => {
    if (file.value?.type?.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
      // (FileReaderオブジェクトを作成します)
      setPreview()
    } else {
      previewUrl.value = null
    }
  }

  previewImage()
}
