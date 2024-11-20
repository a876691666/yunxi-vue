import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateMemberUserDto, ListMemberUserDto, ResetPwdDto, UpdateMemberUserDto } from './member-user.dto'

import { MemberUserService } from './member-user.service'

@Controller('member/member-user')
export class MemberUserController {
  constructor(private readonly MemberUserService: MemberUserService) {}

  @ApiOperation({ summary: '用户表-创建' })
  @RequirePermission('member:member-user:add')
  @Post()
  create(@Body() createMemberUserDto: CreateMemberUserDto) {
    return this.MemberUserService.create(createMemberUserDto)
  }

  @ApiOperation({ summary: '用户表-列表' })
  @RequirePermission('member:member-user:list')
  @Get('list')
  findAll(@Query() query: ListMemberUserDto) {
    return this.MemberUserService.findAll(query)
  }

  @ApiOperation({ summary: '用户表-详情' })
  @RequirePermission('member:member-user:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MemberUserService.findOne(+id)
  }

  @ApiOperation({ summary: '用户表-修改' })
  @RequirePermission('member:member-user:edit')
  @Put()
  update(@Body() updateMemberUserDto: UpdateMemberUserDto) {
    return this.MemberUserService.update(updateMemberUserDto)
  }

  @ApiOperation({ summary: '用户表-删除' })
  @RequirePermission('member:member-user:remove')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MemberUserService.remove(+id)
  }

  @ApiOperation({ summary: '用户-重置密码' })
  @ApiBody({ type: ResetPwdDto, required: true })
  @RequirePermission('member:member-user:resetPwd')
  @Put('resetPwd')
  resetPwd(@Body() body: ResetPwdDto) {
    return this.MemberUserService.resetPwd(body)
  }
}
