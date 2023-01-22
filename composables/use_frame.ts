import { useVuelidate } from '@vuelidate/core'
import { required,minLength , maxLength, tagArrayLength, tagLength } from '~~/utils/i18n-validators'

export interface Frame {
  id: number | null
  user_id: number | null
  user_name: string
  name: string | undefined
  tag_list: string | undefined
  tags: string[] | undefined
  comment: string | undefined
  shooted_at: string | undefined
  shooted_at_html: string | undefined
  file_url: string
  file_two_url: string
  file_three_url: string
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
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    updated_at: ''
  })

  const { baseApiURL } = useConstants()

  const rules = {
    name: { required, minLength: minLength(1), maxLength: maxLength(20) },
    tags: { tagArrayLength: tagArrayLength(5), tagLength: tagLength(10) }
  }
  let v$ = useVuelidate(rules, frame)

  const getFrame = async (id: string ) => {
    const { data } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/frames/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data = data.value
    //console.log(json_data)

    if(json_data){
      if(json_data.data){
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
    }
  }

  const setFrame = (_frame: Frame | undefined) => {
    frame.name = _frame?.name
    frame.comment = _frame?.comment
    frame.tag_list = _frame?.tag_list
    frame.tags = _frame?.tags
    frame.shooted_at = _frame?.shooted_at
  }

  const updateFrame = async () => {

    const result = await v$.value.$validate();

    //console.log(signup_params.image)

    console.log(frame)
    if(!v$.value.$invalid){
      
    }
  }

  return {
    getFrame, frame, v$, setFrame, updateFrame
  }
}