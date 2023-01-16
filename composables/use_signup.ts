import { useVuelidate } from '@vuelidate/core'
import { required ,email, minLength, maxLength } from '~~/utils/i18n-validators'

export const useSignup = () => {
  const signup_params = reactive({
    image: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const rules = {
    name: { required, minLength: minLength(3), maxLength: maxLength(40) },
    email: { required, email },
    password: { required, minLength: minLength(3) },
    password_confirmation: { required }
  }

  const v$ = useVuelidate(rules, signup_params)

  const signup = async () => {
    const result = await v$.value.$validate();
  }

  return { signup_params, v$, signup }
}