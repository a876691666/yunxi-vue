import type { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis'
import type { DynamicModule } from '@nestjs/common'
import { RedisModule as liaoliaoRedisModule } from '@liaoliaots/nestjs-redis'
import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(options: RedisModuleAsyncOptions, isGlobal = true): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisService],
    }
  }

  static forRootAsync(options: RedisModuleAsyncOptions, isGlobal = true): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisService],
    }
  }
}
