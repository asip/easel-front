export interface UserResource {
  name: string
  email: string
  token: string | null | undefined
  id: number | null
  image_thumb_url: string | null
  image_one_url: string | null
  image_three_url: string | null
  social_login: boolean | null | undefined
}