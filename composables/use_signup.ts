import { useVuelidate } from '@vuelidate/core'
import { required ,email, minLength, maxLength } from '~~/utils/i18n-validators'
import {useLocale} from "~/composables/use_locale";

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

  const { locale } = useLocale()

  const signup = async () => {
    // @ts-ignore
    i18n.global.locale.value = locale.value
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
          body: formData,
          headers: {
            'Accept-Language' : locale.value
          }
        })
      )

      const json_data: any = data.value

      //console.log(json_data)

      if (!json_data.data) {
        const errors = json_data.errors
        setErrorMessages(errors)
      }
    }
  }

  const setErrorMessages = (errors: any) => {
    if (errors.image) {
      error_messages.image = errors.image
    } else {
      error_messages.image = []
    }
    if (errors.name) {
      error_messages.name = errors.name
    } else {
      error_messages.name = []
    }
    if (errors.email) {
      error_messages.email = errors.email
    } else {
      error_messages.email = []
    }
    if (errors.password) {
      error_messages.password = errors.password
    } else {
      error_messages.password = []
    }
    if (errors.password_confirmation) {
      error_messages.password_confirmation = errors.password_confirmation
    } else {
      error_messages.password_confirmation = []
    }
  }

  const isSuccess = () => {
    let result: boolean = true

    if(error_messages.image.length > 0 || error_messages.name.length > 0 ||
      error_messages.email.length> 0 || error_messages.password.length > 0 ||
      error_messages.password_confirmation.length > 0
    ){
      result = false
    }

    return result
  }

  return { signup_params, v$, signup, error_messages, isSuccess }
}