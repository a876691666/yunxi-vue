import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { BusinessType } from 'src/common/constant/business.constant'
import { Operlog } from 'src/common/decorators/operlog.decorator'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateGroupDto, ListGroupDto, UpdateGroupDto } from './group.dto'
import { GroupService } from './group.service'

@Controller('member/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @ApiOperation({
    summary: '查询用户分组表列表',
  })
  @RequirePermission('member:group:query')
  @Get('list')
  findAll(@Query() query: ListGroupDto) {
    return this.groupService.findAll(query)
  }

  // 多余的接口可以删除
  @ApiOperation({
    summary: '查询用户分组表下拉选项',
  })
  @RequirePermission('member:group:options')
  @Get('options')
  options(@Query('name') name: string) {
    return this.groupService.options(name)
  }

  @ApiOperation({
    summary: '用户分组表-创建',
  })
  @RequirePermission('member:group:add')
  @Post()
  @Operlog({ businessType: BusinessType.INSERT })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto)
  }

  @ApiOperation({
    summary: '用户分组表-详情',
  })
  @RequirePermission('member:group:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id)
  }

  @ApiOperation({
    summary: '用户分组表-修改',
  })
  @RequirePermission('member:group:edit')
  @Put()
  @Operlog({ businessType: BusinessType.UPDATE })
  update(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(updateGroupDto)
  }

  @ApiOperation({
    summary: '用户分组表-删除',
  })
  @RequirePermission('member:group:remove')
  @Delete(':id')
  @Operlog({ businessType: BusinessType.DELETE })
  remove(@Param('id') id: string) {
    return this.groupService.remove(id)
  }

  @ApiOperation({
    summary: '用户分组表-导出xlsx文件',
  })
  @RequirePermission('member:group:export')
  @Post('/export')
  @Operlog({ businessType: BusinessType.EXPORT })
  async export(@Res() res: Response, @Body() body: ListGroupDto) {
    return this.groupService.export(res, body)
  }
}
