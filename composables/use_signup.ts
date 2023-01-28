import { useVuelidate } from '@vuelidate/core'
import { required ,email, minLength, maxLength } from '~~/utils/i18n-validators'

export interface SignupParams {
  image: Blob | null | undefined
  preview_url: string | null | undefined
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useSignup = () => {
  const signup_params = reactive<SignupParams>({
    image: null,
    preview_url: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const error_messages = reactive({
    image: [],
    name: [],
    email: [],
    password: [],
    password_confirmation: []
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

    //console.log(signup_params.image)

    if(!v$.value.$invalid){
      let formData = new FormData();

      if(signup_params.image){
        formData.append('user[image]', signup_params.image)
      }
      formData.append('user[name]', signup_params.name)
      formData.append('user[email]', signup_params.email)
      formData.append('user[password]', signup_params.password)
      formData.append('user[password_confirmation]', signup_params.password_confirmation)

      const { data } = await useAsyncData('signup', () =>
        $fetch('/api/users/', {
          method: 'post',
          body: formData
        })
      )

      const json_data: any = data.value

      //console.log(json_data)

      if(json_data.data){
        navigateTo('/')
      }else{
        const errors = json_data.errors
        if(errors.image){
          error_messages.image = errors.image
        } else {
          error_messages.image = []
        }
        if(errors.name){
          error_messages.name = errors.name
        } else {
          error_messages.name = []
        }
        if(errors.email){
          error_messages.email = errors.email
        } else {
          error_messages.email = []
        }
        if(errors.password){
          error_messages.password = errors.password
        } else {
          error_messages.password = []
        }
        if(errors.password_confirmation){
          error_messages.password_confirmation = errors.password_confirmation
        } else {
          error_messages.password_confirmation = []
        }
      }
    }

  }

  return { signup_params, v$, signup, error_messages }
}