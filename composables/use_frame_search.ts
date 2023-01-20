import { cdate } from 'cdate'

export const useFrameSearch = () => {
  const word = useState<string>('word', () => {
    return ''
  })
  const page = ref(1)
  const pages = useState<number>('pages', () => {
    return 1
  })

  const frames = useState('frames', () => { return [] })

  const date_word = computed({
    get(){
      return cdate()
    },
    set(value: any){
      word.value = cdate(value).format('YYYY/MM/DD')
    }
  })

  const base_url = "http://localhost:3000/api/front/v1"

  const searchFrame = async () => {
    const { data } = await useAsyncData('searchFrame', () =>
      $fetch(`${base_url}/frames`, {
        method: 'get',
        query: {
          q: word.value,
          page: page.value
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data = data.value
    // console.log(json_data)

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
        pages.value = json_data.meta.pagination.pages
      }
    }
  }

  return {
    word, date_word, page, pages, searchFrame, frames
  }
}