import type { User } from '~/interfaces/user'

export function getUserRules (user: User) {
  const userRules = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: {},
      password_confirmation: { sameAs: sameAs(user.password) }
    }
  })

  return userRules
}
