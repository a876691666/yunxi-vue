import { Module, Global } from '@nestjs/common';
import { ExtendsLogModule } from './log/log.module';
import { ExtendsUploadModule } from './upload/upload.module';

@Global()
@Module({
  imports: [
    ExtendsLogModule, // 扩展日志模块
    ExtendsUploadModule, // 扩展上传模块
  ],
})
export class ExtendsModule {}
