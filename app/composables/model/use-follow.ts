import type { FollowingResource } from '~/interfaces'

import { useAccount } from './use-account'

export function useFollow () {
  const following: Ref<boolean> = ref<boolean>(false)

  const { accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash: flash.value, clearLU: clearLoginUser })

  const isFollowing = async (userId: string) => {
    const { data, error } = await useGetApi<FollowingResource>({
      url: `/account/following/${userId}`,
      token: accessToken.value
    })

    // clearFlash()

    if (error.value) {
      setAlert({ error: error.value, off: true })
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
      setAlert({ error: error.value })
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
      setAlert({ error: error.value })
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing, flash
  }
}
