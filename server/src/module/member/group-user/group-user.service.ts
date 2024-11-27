import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { Cacheable, CacheEvict, CacheList } from 'src/common/decorators/redis.decorator'
import { ExportTable } from 'src/common/utils/export'
import { ResultData } from 'src/common/utils/result'
import { RedisService } from 'src/module/common/redis/redis.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { GroupService } from '../group/group.service'
import { CreateGroupUserDto, ListGroupUserDto, UpdateGroupUserDto } from './group-user.dto'
import { GroupUserEntity } from './group-user.entity'

const CACHE_KEY = 'MEMBER_GROUP-USER:'
const CACHE_ITEMS_KEY = `${CACHE_KEY}ITEMS:`

@Injectable()
export class GroupUserService {
  constructor(
    @InjectRepository(GroupUserEntity)
    private readonly groupUserEntityRep: Repository<GroupUserEntity>,
    private readonly redisService: RedisService,
    private readonly groupService: GroupService,
  ) { }

  async create(createGroupUserDto: CreateGroupUserDto) {
    // 获取分组信息
    const group = await this.groupService.findOne(createGroupUserDto.groupId)
    if (!group.data) {
      throw new BadRequestException('分组不存在')
    }

    // 获取当前分组人数
    const count = await this.count({ groupId: createGroupUserDto.groupId })

    // 校验是否超过最大人数
    if (count.data >= group.data.max) {
      throw new BadRequestException('分组人数已达到上限')
    }

    const res = await this.groupUserEntityRep.save(createGroupUserDto)
    return ResultData.ok(res)
  }

  async count(query: Partial<ListGroupUserDto>) {
    const entity = this.groupUserEntityRep.createQueryBuilder('entity')

    if (query.userId) {
      entity.where('entity.userId = :userId', { userId: query.userId })
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.groupId) {
      entity.andWhere('entity.groupId = :groupId', { groupId: query.groupId })
    }

    return ResultData.ok(await entity.getCount())
  }

  async findAll(query: ListGroupUserDto) {
    const entity = this.groupUserEntityRep.createQueryBuilder('entity')

    if (query.userId) {
      entity.where('entity.userId = :userId', { userId: query.userId })
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    entity.select(['entity.groupId', 'entity.status', 'entity.level'])

    const [rows, total] = await entity.getManyAndCount()

    const groupList = await this.groupService.findByIds(rows.map(item => item.groupId))

    return ResultData.rows({
      rows: groupList.data.map((item, index) => ({
        status: rows[index].status,
        level: rows[index].level,
        groupId: item.id,
        name: item.name,
        module: item.module,
        groupDisabled: item.status,
        remark: item.remark,
      })),
      total,
    })
  }

  async options(name?: string) {
    const entity = this.groupUserEntityRep.createQueryBuilder('entity')
    if (name)
      entity.andWhere('entity.name like :name', { name: `%${name}%` })
    entity.select(['entity.userId', 'entity.name'])

    entity.skip(0).take(10)

    const rows = await entity.getMany()
    return ResultData.ok(rows)
  }

  async findByIds(ids: string[]) {
    if (ids.length === 0) {
      return ResultData.ok([])
    }
    const entity = this.groupUserEntityRep.createQueryBuilder('entity')

    const reulst = await this.redisService.getCacheList<GroupUserEntity>(CACHE_ITEMS_KEY, ids)
    const databaseIds = reulst.map((item, index) => item === null ? ids[index] : null).filter(item => item !== null)

    entity.andWhereInIds(databaseIds)
    const rows = await entity.getMany()
    this.cacheList(rows)

    let rowIndex = 0
    return ResultData.ok(reulst.map((item) => {
      return item === null ? rows[rowIndex++] : item
    }))
  }

  @CacheList(CACHE_ITEMS_KEY, '{userId}')
  async cacheList(list: any[]) {
    return list
  }

  @Cacheable(CACHE_ITEMS_KEY, '{userId}')
  findOneCache(userId: string) {
    return this.groupUserEntityRep.findOne({
      where: { userId },
    })
  }

  async findOne(userId: string) {
    const res = await this.findOneCache(userId)
    return ResultData.ok(res)
  }

  @CacheEvict(CACHE_ITEMS_KEY, '{userId}')
  async update(updateGroupUserDto: UpdateGroupUserDto) {
    const res = await this.groupUserEntityRep.update(
      { userId: updateGroupUserDto.userId },
      updateGroupUserDto,
    )
    return ResultData.ok(res)
  }

  @CacheEvict(CACHE_ITEMS_KEY, '{userId}')
  async remove(userId: string) {
    const data = await this.groupUserEntityRep.delete({ userId })
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
