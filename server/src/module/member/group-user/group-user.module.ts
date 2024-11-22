import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupUserController } from './group-user.controller'
import { GroupUserEntity } from './group-user.entity'
import { GroupUserService } from './group-user.service'

@Module({
  imports: [TypeOrmModule.forFeature([GroupUserEntity])],
  controllers: [GroupUserController],
  providers: [GroupUserService],
})
export class GroupUserModule {}
