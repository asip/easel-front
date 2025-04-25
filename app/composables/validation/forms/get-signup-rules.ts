import type { User } from '~/interfaces/user'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const getSignupRules = (user: User) =>
  () => ({
    name: {
      required, minLength: minLength(3), maxLength: maxLength(40)
    },
    email: { required, email },
    password: { required, minLength: minLength(3) },
    password_confirmation: { required, sameAs: sameAs(user.password) }
  })
