import { Module } from '@nestjs/common';
import { MemberUserService } from './member-user-app.service';
import { MemberUserController } from './member-user-app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberUserEntity } from '../member-user/member-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberUserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MemberUserController],
  providers: [MemberUserService],
})
export class MemberUserAppModule {}
