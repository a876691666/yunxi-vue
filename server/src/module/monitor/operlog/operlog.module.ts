import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysOperlogEntity } from './entities/operlog.entity'
import { OperlogController } from './operlog.controller'
import { OperlogService } from './operlog.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SysOperlogEntity])],
  controllers: [OperlogController],
  providers: [OperlogService],
  exports: [OperlogService],
})
export class OperlogModule {}
