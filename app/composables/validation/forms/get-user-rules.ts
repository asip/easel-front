import type { User } from '~/interfaces'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const getUserRules = (user: User) =>
  () => ({
    name: {
      required, minLength: minLength(3), maxLength: maxLength(40)
    },
    email: { required, email },
    password: { minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user.password) }
  })
