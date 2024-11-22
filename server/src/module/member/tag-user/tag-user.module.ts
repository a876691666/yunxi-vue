import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagModule } from '../tag/tag.module'
import { TagUserController } from './tag-user.controller'
import { TagUserEntity } from './tag-user.entity'
import { TagUserService } from './tag-user.service'

@Module({
  imports: [TypeOrmModule.forFeature([TagUserEntity]), TagModule],
  controllers: [TagUserController],
  providers: [TagUserService],
})
export class TagUserModule {}
