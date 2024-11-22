import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { ExportTable } from 'src/common/utils/export'
import { ResultData } from 'src/common/utils/result'
import { Repository } from 'typeorm'
import { TagService } from '../tag/tag.service'
import { CreateTagUserDto, ListTagUserDto, UpdateTagUserDto } from './tag-user.dto'
import { TagUserEntity } from './tag-user.entity'

@Injectable()
export class TagUserService {
  constructor(
    @InjectRepository(TagUserEntity)
    private readonly tagUserEntityRep: Repository<TagUserEntity>,
    private readonly tagService: TagService,
  ) { }

  async create(createTagUserDto: CreateTagUserDto) {
    const res = await this.tagUserEntityRep.save(createTagUserDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListTagUserDto) {
    const entity = this.tagUserEntityRep.createQueryBuilder('entity')

    entity.where('entity.user_id = :userId', { userId: query.userId })

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    entity.select(['entity.tagId', 'entity.status'])

    const [rows, total] = await entity.getManyAndCount()

    const tagList = await this.tagService.findByIds(rows.map(item => item.tagId))

    return ResultData.rows({
      rows: tagList.data.map((item, index) => ({
        status: rows[index].status,
        tagId: item.id,
        name: item.name,
        module: item.module,
        tagDisabled: item.status,
      })),
      total,
    })
  }

  async findOne(userId: string) {
    const res = await this.tagUserEntityRep.find({ select: ['tagId'], where: { status: '0', userId } })
    const tagList = await this.tagService.findByIds(res.map(item => item.tagId))
    return ResultData.ok(tagList)
  }

  async update(updateTagUserDto: UpdateTagUserDto) {
    const res = await this.tagUserEntityRep.update(
      { userId: updateTagUserDto.userId },
      updateTagUserDto,
    )
    return ResultData.ok(res)
  }

  async remove(userId: string, tagId: string) {
    const data = await this.tagUserEntityRep.delete({ userId, tagId })
    return ResultData.ok(data)
  }

  async export(res: Response, body: ListTagUserDto) {
    delete body.pageNum
    delete body.pageSize
    const list = await this.findAll(body)
    const options = {
      sheetName: '用户标签映射表',
      data: list.data.rows,
      header: [
        { title: '禁止状态', dataIndex: 'status' },
      ],
    }
    ExportTable(options, res)
  }

  async getTagFromUser(userId: string) {
    const res = await this.tagUserEntityRep.find({
      where: { userId },
    })
    return ResultData.ok(res)
  }
}
