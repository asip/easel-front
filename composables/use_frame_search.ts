import { cdate } from 'cdate'

export const useFrameSearch = () => {
  /*
  const word = useState<string>('word', () => {
    return ''
  })
  const page = useState<number>('page', () => {
    return 1
  })
  const pages = useState<number>('pages', () => {
    return 1
  })
  */

  const frame_query = useState('frame_query', () => {
    return {
      word: '',
      page: 1,
      pages: 1
    }
  })

  const frames = useState('frames', () => { return [] })

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

    const json_data = data.value
    //console.log(json_data)

    if(json_data){
      if(json_data.data){
        const frame_list = json_data.data
        frames.value.splice(0, frames.value.length);
        for (let frame of frame_list) {
          //console.log(comment);
          frames.value.push(frame);
        }
        //console.log(frames)
      }
      if(json_data.meta){
        frame_query.value.pages = json_data.meta.pagination.pages
      }
      frame_query.value.page = 1
    }
  }

  return {
    frame_query, date_word, searchFrame, frames
  }
}