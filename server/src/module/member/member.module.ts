import { Module } from '@nestjs/common'
import { AppMemberUserAppModule } from './app-member-user/app-member-user.module'
import { GroupModule } from './group/group.module'
import { GroupUserModule } from './group-user/group-user.module'
import { MemberUserModule } from './member-user/member-user.module'
import { TagModule } from './tag/tag.module'
import { TagUserModule } from './tag-user/tag-user.module'

@Module({
  imports: [
    MemberUserModule,
    AppMemberUserAppModule, // 应用模块

    TagModule,
    TagUserModule,

    GroupModule,
    GroupUserModule,
  ],
})
export class MemberModule { }
