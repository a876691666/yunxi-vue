import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { BusinessType } from 'src/common/constant/business.constant'
import { Operlog } from 'src/common/decorators/operlog.decorator'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateMemberUserDto, ListMemberUserDto, ResetPwdDto, UpdateMemberUserDto } from './member-user.dto'
import { MemberUserService } from './member-user.service'

@Controller('member/member-user')
export class MemberUserController {
  constructor(private readonly memberUserService: MemberUserService) {}

  @ApiOperation({
    summary: '查询App 用户信息表列表',
  })
  @RequirePermission('member:member-user:query')
  @Get('list')
  findAll(@Query() query: ListMemberUserDto) {
    return this.memberUserService.findAll(query)
  }

  @ApiOperation({
    summary: 'App 用户信息表-创建',
  })
  @RequirePermission('member:member-user:add')
  @Post()
  @Operlog({ businessType: BusinessType.INSERT })
  create(@Body() createMemberUserDto: CreateMemberUserDto) {
    return this.memberUserService.create(createMemberUserDto)
  }

  @ApiOperation({
    summary: 'App 用户信息表-详情',
  })
  @RequirePermission('member:member-user:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberUserService.findOne(id)
  }

  @ApiOperation({
    summary: 'App 用户信息表-修改',
  })
  @RequirePermission('member:member-user:edit')
  @Put()
  @Operlog({ businessType: BusinessType.UPDATE })
  update(@Body() updateMemberUserDto: UpdateMemberUserDto) {
    return this.memberUserService.update(updateMemberUserDto)
  }

  @ApiOperation({
    summary: 'App 用户信息表-删除',
  })
  @RequirePermission('member:member-user:remove')
  @Delete(':id')
  @Operlog({ businessType: BusinessType.DELETE })
  remove(@Param('id') id: string) {
    return this.memberUserService.remove(id)
  }

  @ApiOperation({
    summary: 'App 用户信息表-导出xlsx文件',
  })
  @RequirePermission('member:member-user:export')
  @Post('/export')
  @Operlog({ businessType: BusinessType.EXPORT })
  async export(@Res() res: Response, @Body() body: ListMemberUserDto) {
    return this.memberUserService.export(res, body)
  }

  @ApiOperation({ summary: '用户-重置密码' })
  @ApiBody({ type: ResetPwdDto, required: true })
  @RequirePermission('member:member-user:resetPwd')
  @Put('resetPwd')
  resetPwd(@Body() body: ResetPwdDto) {
    return this.memberUserService.resetPwd(body)
  }
}
