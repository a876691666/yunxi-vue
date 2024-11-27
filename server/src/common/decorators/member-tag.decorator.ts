import { SetMetadata } from '@nestjs/common'

export interface MemberTagType {
  module: string
  tagCode: string
  message?: string
}

export const MemberTag = (module: string, tagCode: string, message?: string) => SetMetadata('memberTag', { module, tagCode, message })
