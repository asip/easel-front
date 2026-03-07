import type { BackendErrorResource } from '../resource'

export interface BackendErrorInfo extends Partial<BackendErrorResource> {
  status?: number
}
