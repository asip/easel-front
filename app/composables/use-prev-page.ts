export const usePrevPage = function () {
  const { referers } = useReferer()
  const { current: init, query } = useFrameSearch()

  const redirectTo = async ({ current, fallback }: { current: string; fallback: string }) => {
    if (referers.value[current]) {
      if (referers.value[current] == '/') {
        await init({ cache: false })
        await navigateTo({ path: '/', query: query.value })
      } else {
        await navigateTo(referers.value[current])
      }
    } else {
      await navigateTo(fallback)
    }
  }

  return { redirectTo }
}
