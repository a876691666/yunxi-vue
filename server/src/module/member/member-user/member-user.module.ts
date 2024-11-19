import { Module } from '@nestjs/common';
import { MemberUserService } from './member-user.service';
import { MemberUserController } from './member-user.controller';
import { MemberUserEntity } from './member-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MemberUserEntity])],
  controllers: [MemberUserController],
  providers: [MemberUserService],
})
export class MemberUserModule {}
