import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagController } from './tag.controller'
import { TagEntity } from './tag.entity'
import { TagService } from './tag.service'
import { TagWithUserEntity } from './tag-with-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TagWithUserEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
