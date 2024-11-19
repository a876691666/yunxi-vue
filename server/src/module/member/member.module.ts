import { Module } from '@nestjs/common';
import { MemberUserModule } from './member-user/member-user.module';
import { MemberUserAppModule } from './member-user-app/member-user-app.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    MemberUserModule,
    MemberUserAppModule, // 应用模块

    TagModule,
  ],
})
export class MemberModule {}
