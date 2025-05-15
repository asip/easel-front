import type { User } from '~/interfaces/user'
import { required, maxLength, sameAs } from '@regle/rules'

export const getPasswordRules = (user: User) =>
  () => ({
    current_password: { required },
    password: { maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user.password) }
  })