import { useFrameSearch } from '~/composables';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { autoDetect } = useLocale()
  const { loggedIn, loginUser, authenticate } = useAccount()
  const { referers } = useReferer()
  const { frame, getFrame } = useFrame()
  const { searchFrame } = useFrameSearch()

  autoDetect()
  await authenticate()

  if ((to.path === '/account/frames' || to.path === '/frames/new') && !loggedIn.value) {
    return navigateTo('/')
  }

  if (to.path === '/frames/new' && loggedIn.value) {
    if (to.path !== from.path) {
      referers.value[to.path] = from.fullPath
    } else {
      referers.value[to.path] = '/'
    }
  }

  if (to.path === '/account/frames' && loggedIn.value) {
    if (to.path !== from.path && !(from.path.startsWith('/frames/') && from.fullPath.includes('profile'))) {
      referers.value[to.path] = from.fullPath
    }
  }

  if (to.path.match(/^\/users\/\d+$/)) {
    if (to.path !== from.path && !(from.path.startsWith('/frames/') && from.fullPath.includes('user_profile'))) {
      referers.value[to.path] = from.fullPath
    }
  }

  if (to.path.match(/^\/frames\/\d+$/)) {
    if (!from.path.startsWith('/frames/')) {
      referers.value[to.path] = from.fullPath
    }
  }

  if (to.path.match(/^\/frames\/\d+\/edit$/)) {
    if (to.path !== from.path) {
      referers.value[to.path] = from.fullPath
    }

    const frameId = to.params.id?.toString()
    await getFrame(`${frameId}`)

    if (!loggedIn.value || frame.value.user_id != loginUser.value.id) {
      if (referers.value[to.path]) {
        return navigateTo(referers.value[to.path])
      } else {
        return navigateTo(`/frames/${frameId}`)
      }
    }
  }

  if (to.path === '/') {
    if (import.meta.client) {
      await searchFrame({ client: true })
    }
  }
})
