import { cdate } from 'cdate'
import { Frame } from '~/composables/use_frame'

export const useFrameSearch = () => {
  const frame_query = useState('frame_query', () => {
    return {
      word: '',
      page: 1,
      pages: 1
    }
  })

  const frames = useState<Frame[]>('frames', () => { return [] })

  const date_word = computed({
    get(){
      return cdate()
    },
    set(value: any){
      frame_query.value.word = cdate(value).format('YYYY/MM/DD')
    }
  })

  const { baseApiURL } = useConstants()

  const searchFrame = async () => {
    const { data } = await useAsyncData('searchFrame', () =>
      $fetch(`${baseApiURL}/frames`, {
        method: 'get',
        query: {
          q: frame_query.value.word,
          page: frame_query.value.page
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value
    //console.log(json_data)

    if(json_data){
      if(json_data.data){
        const frame_list = json_data.data
        frames.value.splice(0, frames.value.length);
        for (let frame of frame_list as []) {
          //console.log(comment);
          frames.value.push(createFrameFromJson(frame));
        }
        //console.log(frames)
      }
      if(json_data.meta){
        frame_query.value.pages = json_data.meta.pagination.pages
      }
    }
  }

  const createFrameFromJson = (row_data: any) : Frame => {
    const frame: Frame = {
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
    }
    frame.id = row_data.id
    frame.user_id = row_data.attributes.user_id
    frame.user_name = row_data.attributes.user_name
    frame.name = row_data.attributes.name
    frame.comment = row_data.attributes.comment
    frame.tag_list = row_data.attributes.tag_list
    frame.tags = row_data.attributes.tags
    frame.shooted_at = row_data.attributes.shooted_at
    frame.shooted_at_html = row_data.attributes.shooted_at_html
    frame.updated_at = row_data.attributes.updated_at
    frame.file_url = row_data.attributes.file_url
    frame.file_two_url = row_data.attributes.file_two_url
    frame.file_three_url = row_data.attributes.file_three_url
    return frame
  }

  return {
    frame_query, date_word, searchFrame, frames
  }
}