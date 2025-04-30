import type { FrameResource } from "./frame-resource"

export interface FramesResource {
  frames: [FrameResource]
  meta: {
    pagination: {
      page: number
      pages: number
      count: number
    }
  }
}