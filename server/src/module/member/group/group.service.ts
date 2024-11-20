import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultData } from 'src/common/utils/result'
import { Repository } from 'typeorm'
import { CreateGroupDto, ListGroupDto, UpdateGroupDto } from './group.dto'
import { GroupEntity } from './group.entity'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupEntityRep: Repository<GroupEntity>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const res = await this.groupEntityRep.save(createGroupDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListGroupDto) {
    const entity = this.groupEntityRep.createQueryBuilder('entity')
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })
    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    const [list, total] = await entity.getManyAndCount()

    return ResultData.ok({
      list,
      total,
    })
  }

  async findOne(id: number) {
    const res = await this.groupEntityRep.findOne({
      where: { delFlag: '0', id },
    })
    return ResultData.ok(res)
  }

  async update(updateGroupDto: UpdateGroupDto) {
    const res = await this.groupEntityRep.update(
      { id: updateGroupDto.id },
      updateGroupDto,
    )
    return ResultData.ok(res)
  }

  async remove(id: number) {
    const data = await this.groupEntityRep.update(
      { id },
      { delFlag: '1' },
    )
    return ResultData.ok(data)
  }
}
