import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUploadEntity } from './entities/upload.entity'
import { ExtendsUploadController } from './upload.controller'
import { ExtendsUploadService } from './upload.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SysUploadEntity])],
  controllers: [ExtendsUploadController],
  providers: [ExtendsUploadService],
  exports: [ExtendsUploadService],
})
export class ExtendsUploadModule {}
