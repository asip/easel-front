import type { FollowingResource, ErrorsResource, ErrorMessages } from '~/types'

export const useFollow = function () {
  const { flash, clearFlash } = useFlash()
  const { accessToken, clearAccount } = useAccount()

  const { setError } = useApiError({ flash, caller: { clearAccount } })

  const following: Ref<boolean> = ref<boolean>(false)

  const isFollowing = async (userId: string): Promise<void> => {
    const { data, error } = await useQueryApi<
      FollowingResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/account/following/${userId}`, {
      token: accessToken.value,
    })

    // this.#clearFlash()

    if (error) {
      setError(error, { off: true })
    } else if (data) {
      const { following: followingValue } = data

      if (followingValue != null && followingValue !== undefined) {
        following.value = followingValue
      }
    }
  }

  const follow = async (userId: number | null): Promise<void> => {
    const { error } = await useMutationApi<
      FollowingResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/users/${userId}/follower_relationships`, {
      method: 'post',
      token: accessToken.value,
    })

    clearFlash()

    if (error) {
      setError(error)
    }

    following.value = true
  }

  const unfollow = async (userId: number | null): Promise<void> => {
    const { error } = await useMutationApi<
      FollowingResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/users/${userId}/follower_relationships`, {
      method: 'delete',
      token: accessToken.value,
    })

    clearFlash()

    if (error) {
      setError(error)
    }

    following.value = false
  }

  return {
    following,
    follow,
    unfollow,
    isFollowing,
    flash,
  }
}
