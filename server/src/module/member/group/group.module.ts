import { Module } from '@nestjs/common'
// import { MemberUserService } from './member-user.service';
// import { MemberUserController } from './member-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupEntity } from './group.entity'
import { GroupWithUserEntity } from './group-with-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, GroupWithUserEntity])],
  // controllers: [MemberUserController],
  // providers: [MemberUserService],
})
export class GroupModule {}
