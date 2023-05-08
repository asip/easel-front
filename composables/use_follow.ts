import { useLoginUser } from './use_login_user';
import { Ref } from "vue";

export function useFollow() {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { backendApiURL } = useConstants()
  const { login_user, navigateLogoutTo } = useLoginUser()
  const isFollowing = async (userId: string) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL}/profile/following/${userId}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    const { following: followingValue }  = data.value as any

    if(followingValue !=null || followingValue != undefined){
      following.value = followingValue
    } else if (error.value){
      navigateLogoutTo('/')
    }
  }

  const follow = async (userId: number | null) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL}/users/${userId}/follow_relationships`, {
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value){
      navigateLogoutTo('/')
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL}/users/${userId}/follow_relationships`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value){
      navigateLogoutTo('/')
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing
  }
}