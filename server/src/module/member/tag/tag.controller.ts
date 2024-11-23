import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { BusinessType } from 'src/common/constant/business.constant'
import { Operlog } from 'src/common/decorators/operlog.decorator'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateTagDto, ListTagDto, UpdateTagDto } from './tag.dto'
import { TagService } from './tag.service'

@Controller('member/tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @ApiOperation({
    summary: '查询用户标签表列表',
  })
  @RequirePermission('member:tag:query')
  @Get('list')
  findAll(@Query() query: ListTagDto) {
    return this.tagService.findAll(query)
  }

  @ApiOperation({
    summary: '查询用户标签表下拉选项',
  })
  @RequirePermission('member:tag:options')
  @Get('options')
  options(@Query('name') name: string) {
    return this.tagService.options(name)
  }

  @ApiOperation({
    summary: '修改用户标签状态',
  })
  @RequirePermission('member:tag:edit')
  @Put('status')
  @Operlog({ businessType: BusinessType.UPDATE })
  changeStatus(@Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(updateTagDto)
  }

  @ApiOperation({
    summary: '用户标签表-创建',
  })
  @RequirePermission('member:tag:add')
  @Post()
  @Operlog({ businessType: BusinessType.INSERT })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @ApiOperation({
    summary: '用户标签表-详情',
  })
  @RequirePermission('member:tag:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id)
  }

  @ApiOperation({
    summary: '用户标签表-修改',
  })
  @RequirePermission('member:tag:edit')
  @Put()
  @Operlog({ businessType: BusinessType.UPDATE })
  update(@Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(updateTagDto)
  }

  @ApiOperation({
    summary: '用户标签表-删除',
  })
  @RequirePermission('member:tag:remove')
  @Delete(':id')
  @Operlog({ businessType: BusinessType.DELETE })
  remove(@Param('id') id: string) {
    return this.tagService.remove(id)
  }

  @ApiOperation({
    summary: '用户标签表-导出xlsx文件',
  })
  @RequirePermission('member:tag:export')
  @Post('/export')
  @Operlog({ businessType: BusinessType.EXPORT })
  async export(@Res() res: Response, @Body() body: ListTagDto) {
    return this.tagService.export(res, body)
  }
}
