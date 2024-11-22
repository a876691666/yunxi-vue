import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'src/module/common/redis/redis.module'
import { GroupModule } from '../group/group.module'
import { GroupUserController } from './group-user.controller'
import { GroupUserEntity } from './group-user.entity'
import { GroupUserService } from './group-user.service'

@Module({
  imports: [TypeOrmModule.forFeature([GroupUserEntity]), GroupModule, RedisModule],
  controllers: [GroupUserController],
  providers: [GroupUserService],
})
export class GroupUserModule {}
