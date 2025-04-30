import type { FrameResource } from "."

export interface Frame extends FrameResource {
  preview_url: string | null | undefined
}
