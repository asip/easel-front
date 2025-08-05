import { useAccount } from './use-account'
import type { FollowingResource } from '~/interfaces'

export function useFollow () {
  const following: Ref<boolean> = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const isFollowing = async (userId: string) => {
    const { data, error } = await useGetApi<FollowingResource>({
      url: `/account/following/${userId}`,
      token: accessToken.value
    })

    // clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          // flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        // default:
        //  flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { following: followingValue } = data.value

      if (followingValue != null && followingValue !== undefined) {
        following.value = followingValue
      }
    }
  }

  const follow = async (userId: number | null) => {
    const { error } = await usePostApi({
      url: `/users/${userId}/follow_relationships`,
      token: accessToken.value
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { error } = await useDeleteApi({
      url: `/users/${userId}/follow_relationships`,
      token: accessToken.value
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing, flash
  }
}
