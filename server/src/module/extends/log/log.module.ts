import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogController } from './log.controller'
import { LogEntity } from './log.entity'
import { ExtendsLogService } from './log.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogController],
  providers: [ExtendsLogService],
  exports: [ExtendsLogService],
})
export class ExtendsLogModule {}
