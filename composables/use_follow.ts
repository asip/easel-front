import { Ref } from 'vue'
import { useLoginUser } from './use_login_user'

export function useFollow () {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { backendApiURL } = useConstants()

  const { login_user, navigateLogoutTo } = useLoginUser()

  const isFollowing = async (userId: string) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL.value}/profile/following/${userId}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    const json_data = data.value as any
    if (json_data) {
      const { following: followingValue } = json_data

      if (followingValue != null || followingValue !== undefined) {
        following.value = followingValue
      }
    } else if (error.value) {
      navigateLogoutTo('/')
    }
  }

  const follow = async (userId: number | null) => {
    const { error } = await useAsyncData('follow', () =>
      $fetch(`${backendApiURL.value}/users/${userId}/follow_relationships`, {
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value) {
      navigateLogoutTo('/')
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { error } = await useAsyncData('unfollow', () =>
      $fetch(`${backendApiURL.value}/users/${userId}/follow_relationships`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value) {
      navigateLogoutTo('/')
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing
  }
}
