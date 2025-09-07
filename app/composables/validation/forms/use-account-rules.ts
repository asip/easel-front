import type { User } from '~/interfaces'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const useAccountRules = (user?: User) => {
  const signupRules = () => ({
    image: { maxBlobSize: maxBlobSize(5) },
    name: {
      required, minLength: minLength(3), maxLength: maxLength(40)
    },
    email: { required, email },
    password: {
      required, minLength: minLength(6), maxLength: maxLength(128)
    },
    password_confirmation: { required, sameAs: sameAs(user?.password) }
  })

  const signinRules = {
    email: { required, email },
    password: { required ,minLength: minLength(6), maxLength: maxLength(128) }
  }

  const userRules = () => ({
    image: { maxBlobSize: maxBlobSize(5) },
    name: {
      required, minLength: minLength(3), maxLength: maxLength(40)
    },
    email: { required, email },
    password: { minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user?.password) }
  })

  const profileRules = {
    image: { maxBlobSize: maxBlobSize(5) },
    name: {
      required, minLength: minLength(3), maxLength: maxLength(40)
    },
    email: { required, email }
  }

  const passwordRules = () => ({
    current_password: { required },
    password: { required, minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user?.password) }
  })

  return { signupRules, signinRules, userRules, profileRules, passwordRules }
}
