import { cdate } from 'cdate'

export const useWordSearch = () => {
  const word = useState<string>('word', () => {
    return ''
  })

  const date_word = computed({
    get(){
      return cdate()
    },
    set(value: any){
      word.value = cdate(value).format('YYYY/MM/DD')
    }
  })

  return {
    word, date_word
  }
}