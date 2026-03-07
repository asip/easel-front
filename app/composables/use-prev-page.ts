export function usePrevPage() {
  const { referers } = useReferer()
  const { queryMap } = useFrameSearch()

  const redirectTo = async ({
    current,
    fallback,
  }: {
    current: string
    fallback: string
  }) => {
    if (referers.value[current]) {
      if (referers.value[current] == '/') {
        await navigateTo({ path: '/', query: queryMap.value })
      } else {
        await navigateTo(referers.value[current])
      }
    } else {
      await navigateTo(fallback)
    }
  }

  return { redirectTo }
}
