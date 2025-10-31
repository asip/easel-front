export default defineNuxtRouteMiddleware(async (to, from) => {
  const { autoDetect } = useLocale()
  const { loggedIn, loginUser, authenticate } = useAccount()
  const { referers } = useReferer()
  const { frame, getFrame } = useFrame()

  autoDetect()
  await authenticate()

  if ((to.path === '/account/frames' || to.path === '/frames/new') && !loggedIn.value) {
    return navigateTo('/')
  }

  if ((to.path === '/frames/new' || to.path === '/account/frames') && loggedIn.value) {
    if (to.path !== from.path){
      referers.value[to.path] = from.path
    } else {
      referers.value[to.path] = '/'
    }
    // console.log(referers)
  }

  if (to.path.match(/^\/frames\/\d+\/edit$/)) {
    const frameId = to.params.id?.toString()
    await getFrame(`${frameId}`)

    if (!loggedIn.value || frame.value.user_id != loginUser.value.id) {
      return navigateTo(`/frames/${frameId}`)
    }
  }
})
