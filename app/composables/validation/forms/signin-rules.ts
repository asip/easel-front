import { required, minLength, maxLength, email } from '@regle/rules'

export const signinRules = {
  email: { required, email },
  password: { required ,minLength: minLength(6), maxLength: maxLength(128) }
}
