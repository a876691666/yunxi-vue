import type { RedisClientOptions } from '@liaoliaots/nestjs-redis'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AxiosModule } from './axios/axios.module'
import { RedisModule } from './redis/redis.module'

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: config.get<RedisClientOptions>('redis'),
          }
        },
      },
      true,
    ),

    AxiosModule,
  ],
})
export class CommonModule {}
