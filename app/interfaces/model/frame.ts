import type { FrameResource } from '..'

export interface Frame extends FrameResource {
  file: File | undefined | null
  preview_url: string | null | undefined
  page?: number
}
