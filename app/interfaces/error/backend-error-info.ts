import type { BackendErrorResource } from '../../interfaces'

export interface BackendErrorInfo extends Partial<BackendErrorResource> {
  status?: number
}
