import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'

import { Reflector } from '@nestjs/core'
import { MemberTagType } from '../decorators/member-tag.decorator'

@Injectable()
export class TagGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // 全局配置，
    const req = ctx.switchToHttp().getRequest()

    const tag: MemberTagType = this.reflector.getAllAndOverride('memberTag', [ctx.getClass(), ctx.getHandler()])

    // 不需要鉴权
    if (tag) {
      const isHasTag = this.hasTag(tag, req.user.tags)

      if (!isHasTag)
        throw new ForbiddenException(tag.message)
    }

    return true
  }

  /**
   * 检测用户是否属于某个标签
   * @param tag
   * @param tags
   * @returns
   */
  hasTag(tag: MemberTagType, tags: string[]) {
    return tags.includes(`${tag.module}:${tag.tagCode}`)
  }
}
