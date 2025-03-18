import type { User } from '~/interfaces/user'

export function getSignupRules (user: User) {
  const siginupRules = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: { required, minLength: minLength(3) },
      password_confirmation: { required, sameAs: sameAs(user.password) }
    }
  })

  return siginupRules
}
