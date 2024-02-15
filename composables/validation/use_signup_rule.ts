import type { SignupParams } from '../use_login_user'

export function useSignupRule (user: SignupParams) {
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
