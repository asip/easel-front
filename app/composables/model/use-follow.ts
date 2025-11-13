import type { FollowingResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useFollow () {
  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

  const { setAlert } = useAlert({ flash, caller: { clearLoginUser } })

  const following: Ref<boolean> = ref<boolean>(false)

  const isFollowing = async (userId: string) => {
    const { data, error } = await useGetApi<FollowingResource, ErrorsResource<ErrorMessages<string>>>({
      url: `/account/following/${userId}`,
      token: accessToken.value
    })

    // this.#clearFlash()

    if (error) {
      setAlert({ error, off: true })
    } else if (data) {
      const { following: followingValue } = data

      if (followingValue != null && followingValue !== undefined) {
        following.value = followingValue
      }
    }
  }

  const follow = async (userId: number | null) => {
    const { error } = await usePostApi<FollowingResource, ErrorsResource<ErrorMessages<string>>>({
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
    const { error } = await useDeleteApi<FollowingResource, ErrorsResource<ErrorMessages<string>>>({
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
