import type { FrameResource } from ".."

export interface Frame extends FrameResource {
  file: File | undefined | null,
  tags: string[]
  preview_url: string | null | undefined
}
