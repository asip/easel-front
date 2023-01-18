import { cdate } from 'cdate'

export const useFrameSearch = () => {
  const word = useState<string>('word', () => {
    return ''
  })
  const page = ref(1)

  const frames = useState('frames', () => { return [] })

  const date_word = computed({
    get(){
      return cdate()
    },
    set(value: any){
      word.value = cdate(value).format('YYYY/MM/DD')
    }
  })

  const searchFrame = async () => {
    const { data } = await useAsyncData('searchFrame', () =>
      $fetch('/api/frames', {
        method: 'get',
        query: {
          q: word.value,
          page: page.value
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      },{ server: false })
    )

    const json_data = data.value
    //console.log(json_data)

    if(json_data.data){
      const frame_list = json_data.data
      frames.value.splice(0, frames.value.length);
      for (let frame of frame_list) {
        //console.log(comment);
        frames.value.push(frame);
      }
      //console.log(frames)
    }

  }

  return {
    word, date_word, searchFrame, frames
  }
}