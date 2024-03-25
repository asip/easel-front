import type { User } from '~/interfaces/user'

export function useSignupRule (user: User) {
  const siginup_rule = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: { required, minLength: minLength(3) },
      password_confirmation: { required, sameAs: sameAs(user.password) }
    }
  })

  return siginup_rule
}
