export interface User {
  name: string
  email: string
  token: string | null | undefined
  id: number | null
  image: Blob | null | undefined
  image_thumb_url: string | null
  image_one_url: string | null
  image_three_url: string | null
  preview_url: string | null | undefined
  password: string
  password_confirmation: string
  social_login: boolean | null | undefined
}
