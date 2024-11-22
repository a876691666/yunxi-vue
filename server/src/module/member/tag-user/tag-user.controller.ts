import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { BusinessType } from 'src/common/constant/business.constant'
import { Operlog } from 'src/common/decorators/operlog.decorator'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateTagUserDto, ListTagUserDto, UpdateTagUserDto } from './tag-user.dto'
import { TagUserService } from './tag-user.service'

@Controller('member/tag-user')
export class TagUserController {
  constructor(private readonly tagUserService: TagUserService) { }

  @ApiOperation({
    summary: '查询用户标签映射表列表',
  })
  @RequirePermission('member:tag-user:query')
  @Get('list')
  findAll(@Query() query: ListTagUserDto) {
    return this.tagUserService.findAll(query)
  }

  @ApiOperation({
    summary: '用户标签映射表-创建',
  })
  @RequirePermission('member:tag-user:add')
  @Post()
  @Operlog({ businessType: BusinessType.INSERT })
  create(@Body() createTagUserDto: CreateTagUserDto) {
    return this.tagUserService.create(createTagUserDto)
  }

  @ApiOperation({
    summary: '用户标签映射表-详情',
  })
  @RequirePermission('member:tag-user:query')
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.tagUserService.findOne(userId)
  }

  @ApiOperation({
    summary: '用户标签映射表-修改',
  })
  @RequirePermission('member:tag-user:edit')
  @Put()
  @Operlog({ businessType: BusinessType.UPDATE })
  update(@Body() updateTagUserDto: UpdateTagUserDto) {
    return this.tagUserService.update(updateTagUserDto)
  }

  @ApiOperation({
    summary: '用户标签映射表-删除',
  })
  @RequirePermission('member:tag-user:remove')
  @Delete(':userId/:tagId')
  @Operlog({ businessType: BusinessType.DELETE })
  remove(@Param('userId') userId: string, @Param('tagId') tagId: string) {
    return this.tagUserService.remove(userId, tagId)
  }

  @ApiOperation({
    summary: '用户标签映射表-导出xlsx文件',
  })
  @RequirePermission('member:tag-user:export')
  @Post('/export')
  @Operlog({ businessType: BusinessType.EXPORT })
  async export(@Res() res: Response, @Body() body: ListTagUserDto) {
    return this.tagUserService.export(res, body)
  }
}
