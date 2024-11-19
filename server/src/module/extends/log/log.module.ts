import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtendsLogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogController],
  providers: [ExtendsLogService],
  exports: [ExtendsLogService],
})
export class ExtendsLogModule {}
