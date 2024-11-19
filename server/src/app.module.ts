import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import path from 'node:path'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthGuard } from 'src/common/guards/auth.guard'
import { PermissionGuard } from 'src/common/guards/permission.guard'
import { RolesGuard } from './common/guards/roles.guard'

import configuration from './config/index'
import { CommonModule } from './module/common/common.module'
import { ExtendsModule } from './module/extends/extends.module'
import { MainModule } from './module/main/main.module'
import { MemberModule } from './module/member/member.module'
import { MonitorModule } from './module/monitor/monitor.module'
import { SystemModule } from './module/system/system.module'
import { UploadModule } from './module/upload/upload.module'

@Global()
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          timezone: '+08:00',
          ...config.get('db.mysql'),
        } as TypeOrmModuleOptions
      },
    }),

    MainModule,
    UploadModule,

    CommonModule,
    SystemModule,
    MonitorModule,

    ExtendsModule,
    MemberModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
