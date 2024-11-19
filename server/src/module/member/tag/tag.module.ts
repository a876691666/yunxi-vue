import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { TagWithUserEntity } from './tag-with-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TagWithUserEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
