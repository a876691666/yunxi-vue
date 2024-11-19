import type { PagingDto } from 'src/common/dto'
import type { ExtendsLogService } from './log.service'
import { Controller, Get, Query } from '@nestjs/common'
import { RequireRole } from 'src/common/decorators/require-role.decorator'

@Controller('monitor/log')
export class LogController {
  constructor(readonly logService: ExtendsLogService) {}

  @Get('/list')
  @RequireRole('admin')
  findAll(@Query() query: PagingDto) {
    return this.logService.findAll(query)
  }
}
