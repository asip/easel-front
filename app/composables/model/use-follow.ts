import type { FollowingResource } from '~/interfaces'

import { useAccount } from './use-account'

export function useFollow () {
  const following: Ref<boolean> = ref<boolean>(false)

  const { accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash, clearLU: clearLoginUser })

  const isFollowing = async (userId: string) => {
    const { response, error } = await useGetApi<FollowingResource>({
      url: `/account/following/${userId}`,
      token: accessToken.value
    })

    // clearFlash()

    if (error) {
      setAlert({ error, off: true })
    } else if (response) {
      const { following: followingValue } = response

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

    if (error) {
      setAlert({ error })
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { error } = await useDeleteApi({
      url: `/users/${userId}/follow_relationships`,
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing, flash
  }
}
