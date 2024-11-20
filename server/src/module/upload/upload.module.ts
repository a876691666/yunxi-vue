import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUploadEntity } from './entities/upload.entity'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SysUploadEntity])],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
