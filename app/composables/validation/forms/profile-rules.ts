import { required, minLength, maxLength, email } from '@regle/rules'

export const profileRules = {
  name: {
    required, minLength: minLength(3), maxLength: maxLength(40)
  },
  email: { required, email }
}
