export function useMoreScroll({
  key = null,
  page,
  pages,
}: {
  key?: string | null
  page: number
  pages: number
}) {
  const toFirstUpper = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const currentPage = useState<number>(
    key ? `currentPageFor${toFirstUpper(key)}` : 'currentPage',
    () => {
      return 1
    },
  )

  const pagePrev = useState<boolean>(key ? `pagePrevFor${toFirstUpper(key)}` : 'pagePrev', () => {
    return false
  })
  const pageNext = useState<boolean>(key ? `pageNextFor${toFirstUpper(key)}` : 'pageNext', () => {
    return false
  })

  const minPage = useState<number>(key ? `minPageFor${toFirstUpper(key)}` : 'minPage', () => {
    return 1
  })
  const maxPage = useState<number>(key ? `maxPageFor${toFirstUpper(key)}` : 'maxPage', () => {
    return 1
  })

  const minMaxPage = () => {
    minPage.value = currentPage.value < page ? currentPage.value : page
    maxPage.value = currentPage.value > page ? currentPage.value : page
  }

  const pagePrevNext = () => {
    if (currentPage.value == 1) pagePrev.value = false
    if (currentPage.value == pages) pageNext.value = false
    // console.log(`page prev: ${pagePrev.value}`)
    // console.log(`page next: ${pageNext.value}`)
  }

  const init = () => {
    currentPage.value = page
    pagePrev.value = true
    pageNext.value = true
    minMaxPage()
    pagePrevNext()
  }

  const decrement = () => {
    currentPage.value = minPage.value - 1
    minMaxPage()
    pagePrevNext()
  }

  const increment = () => {
    currentPage.value = maxPage.value + 1
    minMaxPage()
    pagePrevNext()
  }

  return { currentPage, pagePrev, pageNext, minPage, maxPage, init, decrement, increment }
}
