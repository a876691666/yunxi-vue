import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { RequirePermission } from 'src/common/decorators/require-premission.decorator'
import { CreateTagDto, ListTagDto, UpdateTagDto } from './tag.dto'
import { TagService } from './tag.service'

@Controller('member/tag')
export class TagController {
  constructor(private readonly TagService: TagService) {}

  @ApiOperation({ summary: '用户标签-创建' })
  @RequirePermission('member:tag:add')
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.TagService.create(createTagDto)
  }

  @ApiOperation({ summary: '用户标签-列表' })
  @RequirePermission('member:tag:list')
  @Get('list')
  findAll(@Query() query: ListTagDto) {
    return this.TagService.findAll(query)
  }

  @ApiOperation({ summary: '用户标签-详情' })
  @RequirePermission('member:tag:query')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TagService.findOne(id)
  }

  @ApiOperation({ summary: '用户标签-修改' })
  @RequirePermission('member:tag:edit')
  @Put()
  update(@Body() updateTagDto: UpdateTagDto) {
    return this.TagService.update(updateTagDto)
  }

  @ApiOperation({ summary: '用户标签-删除' })
  @RequirePermission('member:tag:remove')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TagService.remove(id)
  }
}
