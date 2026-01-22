export function useMoreScroll ({ key = null, page, pages }: { key?: string | null, page: number, pages: number }) {
  const toFirstUpper = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const currentPage = useState<number>(key ? `currentPageFor${toFirstUpper(key)}` : 'currentPage', () => { return 1 } )

  const pagePrev = useState<boolean>(key ? `pagePrevFor${toFirstUpper(key)}` : 'pagePrev', () => { return false } )
  const pageNext = useState<boolean>(key ? `pageNextFor${toFirstUpper(key)}` : 'pageNext', () => { return false } )

  const maxPage = ref<number>(1)
  const minPage = ref<number>(1)

  const minMaxPage = () => {
    minPage.value = currentPage.value < page ? currentPage.value : page
    maxPage.value = currentPage.value > page ? currentPage.value : page
  }

  const check = () => {
    if(currentPage.value == 1 ) pagePrev.value = false
    if(currentPage.value == pages ) pageNext.value = false
    // console.log(`page prev: ${pagePrev.value}`)
    // console.log(`page next: ${pageNext.value}`)
  }

  return { currentPage, pagePrev, pageNext, minPage, maxPage ,minMaxPage, check }
}
