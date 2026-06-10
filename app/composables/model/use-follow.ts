import type { FollowingResource, ErrorsResource, ErrorMessages } from '~/types'

export const useFollow = function () {
  const { queryApi, mutationApi } = useApi()

  const { flash, clearFlash } = useFlash()
  const { accountToken, clearAccount } = useAccount()

  const { backendErrorInfo, off } = useApiError(flash, { caller: { clearAccount } })

  const following: Ref<boolean> = ref<boolean>(false)

  const isFollowing = async (userId: string): Promise<void> => {
    const { data, error } = await queryApi<
      FollowingResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/account/following/${userId}`, {
      token: accountToken.value,
    })

    // clearFlash()

    if (error) {
      off.value = true
      backendErrorInfo.value = error
    } else if (data) {
      const { following: followingValue } = data

      if (followingValue != null && followingValue !== undefined) following.value = followingValue
      // accountToken.value = token
    }
  }

  const follow = async (userId: number | null): Promise<void> => {
    const { error } = await mutationApi<FollowingResource, ErrorsResource<ErrorMessages<string>>>(
      `/users/${userId}/follower_relationships`,
      {
        method: 'post',
        token: accountToken.value,
      },
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
    } else {
      // accountToken.value = token
    }

    following.value = true
  }

  const unfollow = async (userId: number | null): Promise<void> => {
    const { error } = await mutationApi<FollowingResource, ErrorsResource<ErrorMessages<string>>>(
      `/users/${userId}/follower_relationships`,
      {
        method: 'delete',
        token: accountToken.value,
      },
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
    } else {
      // accountToken.value = token
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
