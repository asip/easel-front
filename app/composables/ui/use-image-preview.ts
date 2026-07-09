type ImagePreviewOptions = {
  previewUrl: Ref<string | null | undefined>
}

export const useImagePreview = function ({ previewUrl }: ImagePreviewOptions): {
  preview: globalThis.WritableComputedRef<string | null | undefined, File | null | undefined>
} {
  const preview = computed<string | null | undefined, File | null | undefined>({
    get() {
      return previewUrl.value
    },
    set(value: File | null | undefined) {
      if (value?.type.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
        setPreview(value)
      } else {
        previewUrl.value = null
      }
    },
  })

  const setPreview = (value: File | null | undefined): void => {
    // Create a FileReader object.
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // The process will execute once loading is complete.
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // Read the file content and assign it to the variable 'image'.
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = reader.result
      // console.log(image?.toString())
      previewUrl.value = image ? (image as string) : null
    }
    // Retrieves the Data URI scheme string.
    // (DataURI Scheme文字列を取得します)
    // if (blob) reader.readAsDataURL(blob)
    if (value) reader.readAsDataURL(value)
  }

  return { preview }
}
