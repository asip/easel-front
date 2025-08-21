import { required, minLength, maxLength } from '@regle/rules'

export const useFrameRules = () => {
  const frameRules = {
    name: {
      required, minLength: minLength(1), maxLength: maxLength(30)
    },
    tags: {
      tagArrayLength: tagArrayLength(5), tagLength: tagLength(10)
    }
  }

  return { frameRules }
}
