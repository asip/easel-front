import { required, minLength, maxLength } from '@regle/rules'

export const useFrameRules = () => {
  const newFrameRules = {
    file: { required, maxFileSize: maxFileSize(5) },
    name: {
      required, minLength: minLength(1), maxLength: maxLength(30)
    },
    tag_list: {
      maxTagArrayLength: maxTagArrayLength(5),
      maxTagLength: maxTagLength(10)
    },
    creator_name: {
      maxLength: maxLength(40)
    }
  }

  const editFrameRules = {
    name: {
      required, minLength: minLength(1), maxLength: maxLength(30)
    },
    tag_list: {
      maxTagArrayLength: maxTagArrayLength(5),
      maxTagLength: maxTagLength(10)
    },
    creator_name: {
      maxLength: maxLength(40)
    }
  }

  const searchRules = {
    word: { maxLength: maxLength(40) },
    frame_name: { maxLength: maxLength(30) },
    tag_name: { maxLength: maxLength(10) },
    user_name: { maxLength: maxLength(40) },
    creator_name: { maxLength: maxLength(40) }
  }

  return { newFrameRules, editFrameRules, searchRules }
}
