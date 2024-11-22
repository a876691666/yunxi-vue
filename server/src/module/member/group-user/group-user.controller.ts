import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { BusinessType } from 'src/common/constant/business.constant'
import { Operlog } from 'src/common/decorators/operlog.decorator'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateGroupUserDto, ListGroupUserDto, UpdateGroupUserDto } from './group-user.dto'
import { GroupUserService } from './group-user.service'

@Controller('member/group-user')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) { }

  @ApiOperation({
    summary: '查询用户分组映射表列表',
  })
  @RequirePermission('member:group-user:query')
  @Get('list')
  findAll(@Query() query: ListGroupUserDto) {
    return this.groupUserService.findAll(query)
  }

  // 多余的接口可以删除
  @ApiOperation({
    summary: '查询用户分组映射表下拉选项',
  })
  @RequirePermission('member:group-user:options')
  @Get('options')
  options(@Query('name') name: string) {
    return this.groupUserService.options(name)
  }

  @ApiOperation({
    summary: '用户分组映射表-创建',
  })
  @RequirePermission('member:group-user:add')
  @Post()
  @Operlog({ businessType: BusinessType.INSERT })
  create(@Body() createGroupUserDto: CreateGroupUserDto) {
    console.log(createGroupUserDto)
    return this.groupUserService.create(createGroupUserDto)
  }

  @ApiOperation({
    summary: '用户分组映射表-详情',
  })
  @RequirePermission('member:group-user:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupUserService.findOne(id)
  }

  @ApiOperation({
    summary: '用户分组映射表-修改',
  })
  @RequirePermission('member:group-user:edit')
  @Put()
  @Operlog({ businessType: BusinessType.UPDATE })
  update(@Body() updateGroupUserDto: UpdateGroupUserDto) {
    return this.groupUserService.update(updateGroupUserDto)
  }

  @ApiOperation({
    summary: '用户分组映射表-删除',
  })
  @RequirePermission('member:group-user:remove')
  @Delete(':id')
  @Operlog({ businessType: BusinessType.DELETE })
  remove(@Param('id') id: string) {
    return this.groupUserService.remove(id)
  }

  @ApiOperation({
    summary: '用户分组映射表-导出xlsx文件',
  })
  @RequirePermission('member:group-user:export')
  @Post('/export')
  @Operlog({ businessType: BusinessType.EXPORT })
  async export(@Res() res: Response, @Body() body: ListGroupUserDto) {
    return this.groupUserService.export(res, body)
  }
}
