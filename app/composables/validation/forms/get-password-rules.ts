import type { User } from '~/interfaces'
import { required, minLength, maxLength, sameAs } from '@regle/rules'

export const getPasswordRules = (user: User) =>
  () => ({
    current_password: { required },
    password: { minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user.password) }
  })