import { Controller, Get, Query } from '@nestjs/common'
import { RequireRole } from 'src/common/decorators/require-role.decorator'
import { PagingDto } from 'src/common/dto'
import { ExtendsLogService } from './log.service'

@Controller('monitor/log')
export class LogController {
  constructor(readonly logService: ExtendsLogService) {}

  @Get('/list')
  @RequireRole('admin')
  findAll(@Query() query: PagingDto) {
    return this.logService.findAll(query)
  }
}
