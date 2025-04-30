import type { UserResource } from "."

export interface User extends UserResource {
  image: Blob | null | undefined
  preview_url: string | null | undefined
  password: string
  password_confirmation: string
}
