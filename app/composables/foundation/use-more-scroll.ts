export function useMoreScroll ({ key = null, page, pages }: { key?: string | null, page: number, pages: number }) {
  const currentPage = useState<number>(key ? `currentPageFor${key}` : 'currentPage', () => { return 1 } )

  const pagePrev = useState<boolean>(key ? `pagePrevFor${key}` : 'pagePrev', () => { return false } )
  const pageNext = useState<boolean>(key ? `pageNextFor${key}` : 'pageNext', () => { return false } )

  const maxPage = ref<number>(1)
  const minPage = ref<number>(1)

  const minMaxPage = () => {
    maxPage.value = currentPage.value > page ? currentPage.value : page
    minPage.value = currentPage.value < page ? currentPage.value : page
  }

  const check = () => {
    if(currentPage.value == 1 ) pagePrev.value = false
    if(currentPage.value == pages ) pageNext.value = false
    // console.log(`page prev: ${pagePrev.value}`)
    // console.log(`page next: ${pageNext.value}`)
  }

  return { currentPage, pagePrev, pageNext, minPage, maxPage ,minMaxPage, check }
}
