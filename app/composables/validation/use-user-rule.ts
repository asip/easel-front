import type { User } from '~/interfaces/user'

export function useUserRule (user: User) {
  const user_rule = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: {},
      password_confirmation: { sameAs: sameAs(user.password) }
    }
  })

  return user_rule
}
