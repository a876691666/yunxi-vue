import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { Cacheable, CacheEvict, CacheList } from 'src/common/decorators/redis.decorator'
import { ExportTable } from 'src/common/utils/export'
import { ResultData } from 'src/common/utils/result'
import { RedisService } from 'src/module/common/redis/redis.service'
import { Repository } from 'typeorm'
import { CreateTagDto, ListTagDto, UpdateTagDto } from './tag.dto'
import { TagEntity } from './tag.entity'

const CACHE_KEY = 'MEMBER_TAG:'
const CACHE_ITEMS_KEY = `${CACHE_KEY}ITEMS:`

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntityRep: Repository<TagEntity>,
    private readonly redisService: RedisService,
  ) { }

  async create(createTagDto: CreateTagDto) {
    const res = await this.tagEntityRep.save(createTagDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListTagDto) {
    const entity = this.tagEntityRep.createQueryBuilder('entity')

    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.remark) {
      entity.andWhere('entity.remark = :remark', { remark: query.remark })
    }

    if (query.name) {
      entity.andWhere('entity.name like :name', { name: `%${query.name}%` })
    }

    if (query.code) {
      entity.andWhere('entity.code = :code', { code: query.code })
    }

    if (query.module) {
      entity.andWhere('entity.module = :module', { module: query.module })
    }

    if (query.createBy) {
      entity.andWhere('entity.createBy = :createBy', { createBy: query.createBy })
    }

    if (query.createTime && query.createTime.length === 2) {
      entity.andWhere('entity.createTime between :createTime0 and :createTime1', {
        createTime0: query.createTime[0],
        createTime1: query.createTime[1],
      })
    }

    if (query.updateBy) {
      entity.andWhere('entity.updateBy = :updateBy', { updateBy: query.updateBy })
    }

    if (query.updateTime && query.updateTime.length === 2) {
      entity.andWhere('entity.updateTime between :updateTime0 and :updateTime1', {
        updateTime0: query.updateTime[0],
        updateTime1: query.updateTime[1],
      })
    }

    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    const [rows, total] = await entity.getManyAndCount()

    await this.cacheList(rows)

    return ResultData.rows({ rows, total })
  }

  async options(name?: string) {
    const entity = this.tagEntityRep.createQueryBuilder('entity')
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })
    if (name)
      entity.andWhere('entity.name like :name', { name: `%${name}%` })
    entity.select(['entity.id', 'entity.name'])

    entity.skip(0).take(10)

    const rows = await entity.getMany()
    return ResultData.ok(rows)
  }

  async findByIds(ids: string[]): Promise<ResultData<(TagEntity | null)[]>> {
    if (ids.length === 0) {
      return ResultData.ok([])
    }
    const entity = this.tagEntityRep.createQueryBuilder('entity')
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })

    const reulst = await this.redisService.getCacheList<TagEntity>(CACHE_ITEMS_KEY, ids)
    const databaseIds = reulst.map((item, index) => item === null ? ids[index] : null).filter(item => item !== null)

    entity.andWhereInIds(databaseIds)
    const rows = await entity.getMany()
    this.cacheList(rows)

    let rowIndex = 0
    return ResultData.ok(reulst.map((item) => {
      return item === null ? rows[rowIndex++] : item
    }))
  }

  @CacheList(CACHE_ITEMS_KEY, '{id}')
  async cacheList(list: any[]) {
    return list
  }

  @Cacheable(CACHE_ITEMS_KEY, '{id}')
  async findOneCache(id: string) {
    const oneData = await this.tagEntityRep.findOne({ where: { delFlag: '0', id } })
    if (!oneData)
      throw new BadRequestException('数据不存在')
    return oneData
  }

  async findOne(id: string) {
    const res = await this.findOneCache(id)
    return ResultData.ok(res)
  }

  @CacheEvict(CACHE_ITEMS_KEY, '{id}')
  async update(updateTagDto: UpdateTagDto) {
    const res = await this.tagEntityRep.update(
      { id: updateTagDto.id },
      updateTagDto,
    )
    return ResultData.ok(res)
  }

  @CacheEvict(CACHE_ITEMS_KEY, '{id}')
  async remove(id: string) {
    const data = await this.tagEntityRep.update(
      { id },
      { delFlag: '1' },
    )
    return ResultData.ok(data)
  }

  async export(res: Response, body: ListTagDto) {
    delete body.pageNum
    delete body.pageSize
    const list = await this.findAll(body)
    const options = {
      sheetName: '用户标签表',
      data: list.data.list,
      header: [
        { title: '状态', dataIndex: 'status' },
        { title: '备注', dataIndex: 'remark' },
        { title: '标签显示名', dataIndex: 'name' },
        { title: '标签code', dataIndex: 'code' },
        { title: '模块标志', dataIndex: 'module' },
      ],
    }
    ExportTable(options, res)
  }
}
