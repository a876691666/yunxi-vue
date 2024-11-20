import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateGroupDto, ListGroupDto, UpdateGroupDto } from './group.dto'
import { GroupService } from './group.service'

@Controller('member/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary: '查询用户分组表列表',
  })
  @RequirePermission('member:group:list')
  @Get('list')
  findAll(@Query() query: ListGroupDto) {
    return this.groupService.findAll(query)
  }

  @ApiOperation({
    summary: '用户分组表-创建',
  })
  @RequirePermission('member:group:add')
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto)
  }

  @ApiOperation({
    summary: '用户分组表-详情',
  })
  @RequirePermission('member:group:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id)
  }

  @ApiOperation({
    summary: '用户分组表-修改',
  })
  @RequirePermission('member:group:edit')
  @Put()
  update(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(updateGroupDto)
  }

  @ApiOperation({
    summary: '用户分组表-删除',
  })
  @RequirePermission('member:group:remove')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id)
  }
}
