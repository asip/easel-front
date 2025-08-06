export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { loggedIn, loginUser, authenticate } = useAccount()
  const { frame, getFrame } = useFrame()

  await authenticate()

  if ((to.path === '/account/frames' || to.path === '/frames/new') && !loggedIn.value) {
    return navigateTo('/')
  }

  if (to.path.match(/^\/frames\/\d+\/edit$/)) {
    const frameId = to.params.id as string
    await getFrame(frameId)

    if (!loggedIn.value || frame.value.user_id != loginUser.value.id) {
      return navigateTo(`/frames/${frameId}`)
    }
  }
})
