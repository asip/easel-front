import { required, minLength, maxLength } from '@regle/rules'

export const useFrameRules = () => {
  const newFrameRules = {
    file: { required, maxBlobSize: maxBlobSize(5) },
    name: {
      required, minLength: minLength(1), maxLength: maxLength(30)
    },
    tags: {
      maxTagArrayLength: maxTagArrayLength(5),
      maxTagLength: maxTagLength(10)
    }
  }

  const editFrameRules = {
    name: {
      required, minLength: minLength(1), maxLength: maxLength(30)
    },
    tags: {
      maxTagArrayLength: maxTagArrayLength(5),
      maxTagLength: maxTagLength(10)
    }
  }

  const searchRules = {
    word: { maxLength: maxLength(40) }
  }

  return { newFrameRules, editFrameRules, searchRules }
}
