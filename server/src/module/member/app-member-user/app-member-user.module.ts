import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MemberUserEntity } from '../member-user/member-user.entity'
import { TagUserModule } from '../tag-user/tag-user.module'
import { AppMemberUserController } from './app-member-user.controller'
import { AppMemberUserService } from './app-member-user.service'

@Global()
@Module({
  imports: [
    TagUserModule,
    TypeOrmModule.forFeature([MemberUserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppMemberUserController],
  providers: [AppMemberUserService],
  exports: [AppMemberUserService],
})
export class AppMemberUserAppModule { }
