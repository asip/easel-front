import type { User } from '~/interfaces/user'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const getSignupRules = (user: User) => {
  return computed(() => {
    return {
      name: {
        required: withMessage(required, () => i18n.global.t('rules.required')),
        minLength: withMessage(minLength(3), () => i18n.global.t('rules.minLength', { min: 3 })),
        maxLength: withMessage(maxLength(40),() => i18n.global.t('rules.maxLength', { max: 40 }))
      },
      email: {
        required: withMessage(required, () => i18n.global.t('rules.required')),
        email: withMessage(email, () => i18n.global.t('rules.email'))
      },
      password: {
        required: withMessage(required, () => i18n.global.t('rules.required')),
        minLength: withMessage(minLength(3), () => i18n.global.t('rules.minLength', { min: 3 }))
      },
      password_confirmation: {
        required: withMessage(required, () => i18n.global.t('rules.required')),
        sameAs: withMessage(sameAs(user.password), () => i18n.global.t('rules.sameAs'))
      }
    }
  })
}
