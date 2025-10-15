import type { FollowingResource, Flash } from '~/interfaces'

export function useFollow () {
  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

  const UseFollow = class {
    flash: Ref<Flash>

    clearLoginUser: UseAccountType['clearLoginUser']
    #setAlert: UseAlertType['setAlert']

    constructor() {
      const { setAlert } = useAlert({ flash, caller: this })

      this.flash = flash

      this.clearLoginUser = clearLoginUser
      this.#setAlert = setAlert
    }

    following: Ref<boolean> = ref<boolean>(false)

    isFollowing = async (userId: string) => {
      const { data, error } = await useGetApi<FollowingResource>({
        url: `/account/following/${userId}`,
        token: accessToken.value
      })

      // this.#clearFlash()

      if (error) {
        this.#setAlert({ error, off: true })
      } else if (data) {
        const { following: followingValue } = data

        if (followingValue != null && followingValue !== undefined) {
          this.following.value = followingValue
        }
      }
    }

    follow = async (userId: number | null) => {
      const { error } = await usePostApi({
        url: `/users/${userId}/follow_relationships`,
        token: accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      }

      this.following.value = true
    }

    unfollow = async (userId: number | null) => {
      const { error } = await useDeleteApi({
        url: `/users/${userId}/follow_relationships`,
        token: accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      }

      this.following.value = false
    }
  }

  const self = new UseFollow()

  return self
}
