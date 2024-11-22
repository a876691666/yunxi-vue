import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { ExportTable } from 'src/common/utils/export'
import { ResultData } from 'src/common/utils/result'
import { Repository } from 'typeorm'
import { CreateGroupUserDto, ListGroupUserDto, UpdateGroupUserDto } from './group-user.dto'
import { GroupUserEntity } from './group-user.entity'

@Injectable()
export class GroupUserService {
  constructor(
    @InjectRepository(GroupUserEntity)
    private readonly groupUserEntityRep: Repository<GroupUserEntity>,
  ) { }

  async create(createGroupUserDto: CreateGroupUserDto) {
    const res = await this.groupUserEntityRep.save(createGroupUserDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListGroupUserDto) {
    const entity = this.groupUserEntityRep.createQueryBuilder('entity')

    if (query.level) {
      entity.andWhere('entity.level = :level', { level: query.level })
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    const [rows, total] = await entity.getManyAndCount()

    return ResultData.rows({ rows, total })
  }

  async findOne(id: string) {
    const res = await this.groupUserEntityRep.findOne({
      where: { userId: id },
    })
    return ResultData.ok(res)
  }

  async update(updateGroupUserDto: UpdateGroupUserDto) {
    const res = await this.groupUserEntityRep.update(
      { userId: updateGroupUserDto.userId },
      updateGroupUserDto,
    )
    return ResultData.ok(res)
  }

  async remove(id: string) {
    const data = await this.groupUserEntityRep.delete({ userId: id })
    return ResultData.ok(data)
  }

  async export(res: Response, body: ListGroupUserDto) {
    delete body.pageNum
    delete body.pageSize
    const list = await this.findAll(body)
    const options = {
      sheetName: '用户分组映射表',
      data: list.data.rows,
      header: [
        { title: '级别', dataIndex: 'level' },
        { title: '禁止状态', dataIndex: 'status' },
      ],
    }
    ExportTable(options, res)
  }
}
