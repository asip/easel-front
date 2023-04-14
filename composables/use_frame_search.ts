import {cdate} from 'cdate'
import {Frame} from '~/composables/use_frame'

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
      return cdate().format('YYYY/MM/DD')
    },
    set(value: any){
      frame_query.value.word = cdate(value).format('YYYY/MM/DD')
    }
  })

  const { backendApiURL } = useConstants()

  const searchFrame = async () => {
    const { data } = await useAsyncData('searchFrame', () =>
      $fetch(`${backendApiURL}/frames`, {
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
    return {
      id: row_data.id,
      user_id: row_data.attributes.user_id,
      user_name: row_data.attributes.user_name,
      name: row_data.attributes.name,
      tag_list: row_data.attributes.tag_list,
      tags: row_data.attributes.tags,
      comment: row_data.attributes.comment,
      shooted_at: row_data.attributes.shooted_at,
      shooted_at_html: row_data.attributes.shooted_at_html,
      file: null,
      file_url: row_data.attributes.file_url,
      file_two_url: row_data.attributes.file_two_url,
      file_three_url: row_data.attributes.file_three_url,
      preview_url: null,
      updated_at: row_data.attributes.updated_at
    }
  }

  return {
    frame_query, date_word, searchFrame, frames
  }
}