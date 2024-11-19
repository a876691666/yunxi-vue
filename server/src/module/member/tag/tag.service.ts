import type { Repository } from 'typeorm'
import type { CreateTagDto, ListTagDto, UpdateTagDto } from './tag.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultData } from 'src/common/utils/result'
import { TagEntity } from './tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntityRep: Repository<TagEntity>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const res = await this.tagEntityRep.save(createTagDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListTagDto) {
    const entity = this.tagEntityRep.createQueryBuilder('entity')
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })
    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    const [list, total] = await entity.getManyAndCount()

    return ResultData.ok({
      list,
      total,
    })
  }

  async findOne(id: string) {
    const res = await this.tagEntityRep.findOne({
      where: {
        delFlag: '0',
        id,
      },
    })
    return ResultData.ok(res)
  }

  async update(updateTagDto: UpdateTagDto) {
    console.log(updateTagDto)
    const res = await this.tagEntityRep.update({ id: updateTagDto.id }, updateTagDto)
    return ResultData.ok(res)
  }

  async remove(id: string) {
    const data = await this.tagEntityRep.update(
      { id },
      {
        delFlag: '1',
      },
    )
    return ResultData.ok(data)
  }
}
