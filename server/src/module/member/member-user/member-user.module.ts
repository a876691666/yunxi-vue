import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MemberUserController } from './member-user.controller'
import { MemberUserEntity } from './member-user.entity'
import { MemberUserService } from './member-user.service'

@Module({
  imports: [TypeOrmModule.forFeature([MemberUserEntity])],
  controllers: [MemberUserController],
  providers: [MemberUserService],
})
export class MemberUserModule {}
