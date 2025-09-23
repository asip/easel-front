export interface UserResource {
  id: number | null
  name: string
  email: string
  token: string | null | undefined
  time_zone: string
  image_thumb_url: string | null
  image_one_url: string | null
  image_three_url: string | null
  social_login: boolean | null | undefined
}