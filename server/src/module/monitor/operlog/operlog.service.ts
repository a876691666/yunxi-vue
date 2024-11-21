import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { ResultData } from 'src/common/utils/result'
import { AxiosService } from 'src/module/common/axios/axios.service'
import { IsNull, Not, Repository } from 'typeorm'

import { CreateOperlogDto } from './dto/create-operlog.dto'
import { UpdateOperlogDto } from './dto/update-operlog.dto'
import { SysOperlogEntity } from './entities/operlog.entity'

@Injectable({ scope: Scope.REQUEST })
export class OperlogService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { user: any },
    @InjectRepository(SysOperlogEntity)
    private readonly sysOperlogEntityRep: Repository<SysOperlogEntity>,
    private readonly axiosService: AxiosService,
  ) { }

  create(createOperlogDto: CreateOperlogDto) {
    return 'This action adds a new operlog'
  }

  async findAll(query: any) {
    const entity = this.sysOperlogEntityRep.createQueryBuilder('entity')

    if (query.pageSize && query.pageNum) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    const orderMap = {
      descending: 'DESC',
      ascending: 'ASC',
    }

    if (query.orderByColumn && query.isAsc) {
      entity.orderBy(`entity.${query.orderByColumn}`, orderMap[query.isAsc])
    }

    const [rows, total] = await entity.getManyAndCount()

    return ResultData.rows({ rows, total })
  }

  async removeAll() {
    await this.sysOperlogEntityRep.delete({ operId: Not(IsNull()) })
    return ResultData.ok()
  }

  findOne(id: number) {
    return `This action returns a #${id} operlog`
  }

  update(id: number, updateOperlogDto: UpdateOperlogDto) {
    return `This action updates a #${id} operlog`
  }

  remove(id: number) {
    return `This action removes a #${id} operlog`
  }

  /**
   * @description: 录入日志
   */
  async logAction({
    resultData,
    costTime,
    title,
    handlerName,
    errorMsg,
    status = '0',
    businessType,
  }: {
    resultData?: any
    costTime: number
    title: string
    handlerName: string
    errorMsg?: string
    status?: string
    businessType: number
  }) {
    const { originalUrl, method, ip, body, query } = this.request
    const { user } = this.request.user
    const operLocation = await this.axiosService.getIpAddress(ip)

    const params = {
      title,
      method: handlerName,
      operName: user.nickName,
      deptName: user.deptName,
      operUrl: originalUrl,
      requestMethod: method.toUpperCase(),
      operIp: ip,
      costTime,
      operLocation,
      operParam: JSON.stringify({ ...body, ...query }),
      jsonResult: JSON.stringify(resultData),
      errorMsg,
      status,

      businessType,
      operatorType: '1',
      operTime: new Date(),
    }

    await this.sysOperlogEntityRep.save(params)
  }
}
