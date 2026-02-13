import type { User } from '~/interfaces'
import { required, minLength, maxLength, maxFileSize, email, sameAs } from '@regle/rules'

export const useAccountRules = (user?: User) => {
  const { $i18n } = useNuxtApp()

  const signupRules = () => ({
    image: { maxFileSize: maxFileSize(5) },
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40),
    },
    email: { required, email },
    profile: { maxLength: maxLength(160) },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(128),
    },
    password_confirmation: {
      required,
      sameAs: sameAs(user?.password, $i18n.t('model.user.password')),
    },
    time_zone: { required },
  })

  const signinRules = {
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(128) },
  }

  const userRules = () => ({
    image: { maxFileSize: maxFileSize(5) },
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40),
    },
    email: { required, email },
    profile: { maxLength: maxLength(160) },
    password: { minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user?.password, $i18n.t('model.user.password')) },
  })

  const profileRules = {
    image: { maxFileSize: maxFileSize(5) },
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40),
    },
    email: { required, email },
    profile: { maxLength: maxLength(160) },
    time_zone: { required },
  }

  const passwordRules = () => ({
    current_password: { required },
    password: { required, minLength: minLength(6), maxLength: maxLength(128) },
    password_confirmation: { sameAs: sameAs(user?.password, $i18n.t('model.user.password')) },
  })

  return { signupRules, signinRules, userRules, profileRules, passwordRules }
}
