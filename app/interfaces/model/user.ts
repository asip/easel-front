import type { UserResource } from ".."

export interface User extends UserResource {
  image: File | null | undefined
  preview_url: string | null | undefined
  current_password?: string | null
  password: string
  password_confirmation: string
}
