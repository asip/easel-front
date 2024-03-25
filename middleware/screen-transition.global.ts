import { useLoginUser } from '@/composables/use-login-user'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { logged_in, login_user, authenticate } = useLoginUser()
  const { frame, getFrame } = useFrame()

  if (!logged_in.value) {
    await authenticate()
  }

  if ((to.path === '/account/frames' || to.path === '/frames/new') && !logged_in.value) {
    return navigateTo('/')
  }

  if (to.path.match(/^\/frames\/\d+\/edit$/)) {
    const frame_id = to.params.id as string
    await getFrame(frame_id)
    // eslint-disable-next-line eqeqeq
    if (!logged_in.value || frame.value.user_id != login_user.value.id) {
      return navigateTo(`/frames/${frame_id}`)
    }
  }
})
