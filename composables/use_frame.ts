import { useVuelidate } from '@vuelidate/core'
import { required,minLength , maxLength, tagArrayLength, tagLength } from '~~/utils/i18n-validators'
import {useLocale} from "~/composables/use_locale";

export interface Frame {
  id: number | null | undefined
  user_id: number | null | undefined
  user_name: string
  name: string
  tag_list: string
  tags: string[]
  comment: string
  shooted_at: string
  shooted_at_html: string | null | undefined
  file: Blob | undefined | null,
  file_url: string | null | undefined
  file_two_url: string | null | undefined
  file_three_url: string | null | undefined
  preview_url: string | null | undefined
  updated_at: string
}

export const useFrame = () => {

  let frame: Frame = reactive<Frame>({
    id: null,
    user_id: null,
    user_name: '',
    name: '',
    tag_list: '',
    tags: [],
    comment: '',
    shooted_at: '',
    shooted_at_html: '',
    file: null,
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    preview_url: null,
    updated_at: ''
  })

  const frameId = computed(() => {
    return frame.id
  })

  const error_messages = reactive({
    name: [],
    tags: [],
    file: []
  })

  const { backendApiURL } = useConstants()

  const rules = {
    name: { required, minLength: minLength(1), maxLength: maxLength(20) },
    tags: { tagArrayLength: tagArrayLength(5), tagLength: tagLength(10) }
  }

  const v$ = useVuelidate(rules, frame)

  const { locale } = useLocale()
  const { login_user, navigateLogoutTo } = useLoginUser()

  const getFrame = async (id: string ) => {
    const { data } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL}/frames/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value
    //console.log(json_data)

    if(json_data && json_data.data){
      setJson2Frame(json_data)
    }
  }

  const setJson2Frame = (json_data: any) => {
    frame.id = json_data.data.id
    frame.user_id = json_data.data.attributes.user_id
    frame.user_name = json_data.data.attributes.user_name
    frame.name = json_data.data.attributes.name
    frame.comment = json_data.data.attributes.comment
    frame.tag_list = json_data.data.attributes.tag_list
    frame.tags = json_data.data.attributes.tags
    frame.shooted_at = json_data.data.attributes.shooted_at
    frame.shooted_at_html = json_data.data.attributes.shooted_at_html
    frame.updated_at = json_data.data.attributes.updated_at
    frame.file_url = json_data.data.attributes.file_url
    frame.file_two_url = json_data.data.attributes.file_two_url
    frame.file_three_url = json_data.data.attributes.file_three_url
  }

  const createFrame = async () => {

    // @ts-ignore
    i18n.global.locale.value = locale.value
    const result = await v$.value.$validate();

    //console.log(frame)
    if(!v$.value.$invalid){
      let formData = new FormData();

      if(frame.file){
        formData.append('frame[file]', frame.file)
      }
      formData.append('frame[name]', frame.name)
      formData.append('frame[tag_list]', frame.tag_list)
      formData.append('frame[comment]', frame.comment)
      formData.append('frame[shooted_at]',frame.shooted_at)

      //console.log(login_user.value.token)

      const { data, error } = await useAsyncData('createFrame', () =>
        $fetch('/api/frames/', {
          method: 'post',
          body: formData,
          headers: {
            'Accept-Language' : locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          }
        })
      )

      const json_data: any = data.value

      if (json_data && json_data.data){
        frame.id = json_data.data.id
      } else if (json_data && json_data.errors){
        const errors = json_data.errors

        setErrorMessages(errors)
      } else if (error.value) {
        navigateLogoutTo('/')
      }
    }
  }

  const setErrorMessages = (errors: any) => {
    if(errors.file){
      error_messages.file = errors.file
    } else {
      error_messages.file = []
    }
    if(errors.name){
      error_messages.name = errors.name
    } else {
      error_messages.name = []
    }
    if(errors.tag_list){
      error_messages.tags = errors.tag_list
    } else {
      error_messages.tags = []
    }
  }

  const isSuccess = () => {
    let result: boolean = true

    if(error_messages.file.length > 0 || error_messages.name.length > 0 ||
      error_messages.tags.length> 0
    ){
      result = false
    }

    return result
  }

  const updateFrame = async () => {

    // @ts-ignore
    i18n.global.locale.value = locale.value
    const result = await v$.value.$validate();

    //console.log(frame)
    if(!v$.value.$invalid){
      const postData = {
        frame: {
          name: frame.name,
          tag_list: frame.tag_list,
          comment: frame.comment,
          shooted_at: frame.shooted_at
        }
      }

      //console.log(login_user.value.token)

      const { data, error } = await useAsyncData('updateFrame', () =>
        $fetch(`/api/frames/${frame.id}`, {
          method: 'put',
          body: postData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language' : locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          }
        })
      )

      const json_data: any = data.value

      if (json_data && !json_data.data && json_data.errors) {
        const errors = json_data.errors

        setErrorMessages(errors)
      }else if (error.value) {
        navigateLogoutTo('/')
      }
    }
  }

  const deleteFrame = async () => {
    //console.log(frame.id)

    const { data, error } = await useAsyncData('deleteFrame', () =>
      $fetch(`/api/frames/${frame.id}`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${login_user.value.token}`
        }
      })
    )

    if(error.value){
      navigateLogoutTo('/')
    }else{
      navigateTo('/')
    }

    //const json_data = data.value
  }

  return {
    getFrame, frame, frameId, v$, updateFrame, createFrame, deleteFrame, error_messages, isSuccess
  }
}