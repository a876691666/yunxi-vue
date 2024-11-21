import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { ExportTable } from 'src/common/utils/export'
import { ResultData } from 'src/common/utils/result'
import { Repository } from 'typeorm'
import { CreateMemberUserDto, ListMemberUserDto, ResetPwdDto, UpdateMemberUserDto } from './member-user.dto'
import { MemberUserEntity } from './member-user.entity'

@Injectable()
export class MemberUserService {
  constructor(
    @InjectRepository(MemberUserEntity)
    private readonly memberUserEntityRep: Repository<MemberUserEntity>,
  ) { }

  async create(createMemberUserDto: CreateMemberUserDto) {
    const res = await this.memberUserEntityRep.save(createMemberUserDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListMemberUserDto) {
    const entity = this.memberUserEntityRep.createQueryBuilder('entity')

    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })

    if (query.userName) {
      entity.andWhere('entity.userName like :userName', { userName: `%${query.userName}%` })
    }

    if (query.nickName) {
      entity.andWhere('entity.nickName like :nickName', { nickName: `%${query.nickName}%` })
    }

    if (query.email) {
      entity.andWhere('entity.email like :email', { email: `%${query.email}%` })
    }

    if (query.phonenumber) {
      entity.andWhere('entity.phonenumber like :phonenumber', { phonenumber: `%${query.phonenumber}%` })
    }

    if (query.sex) {
      entity.andWhere('entity.sex = :sex', { sex: query.sex })
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status })
    }

    if (query.loginIp) {
      entity.andWhere('entity.loginIp = :loginIp', { loginIp: query.loginIp })
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

    if (query.remark) {
      entity.andWhere('entity.remark = :remark', { remark: query.remark })
    }

    if (query.avatar) {
      entity.andWhere('entity.avatar = :avatar', { avatar: query.avatar })
    }

    if (query.loginDate && query.loginDate.length === 2) {
      entity.andWhere('entity.loginDate between :loginDate0 and :loginDate1', {
        loginDate0: query.loginDate[0],
        loginDate1: query.loginDate[1],
      })
    }

    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    }

    const [rows, total] = await entity.getManyAndCount()

    return ResultData.rows({ rows, total })
  }

  async findOne(id: number) {
    const res = await this.memberUserEntityRep.findOne({
      where: {
        delFlag: '0',
        userId: id,
      },
    })
    return ResultData.ok(res)
  }

  async update(updateMemberUserDto: UpdateMemberUserDto) {
    const res = await this.memberUserEntityRep.update(
      { userId: updateMemberUserDto.userId },
      updateMemberUserDto,
    )
    return ResultData.ok(res)
  }

  async remove(id: number) {
    const data = await this.memberUserEntityRep.update(
      { userId: id },
      { delFlag: '1' },
    )
    return ResultData.ok(data)
  }

  async export(res: Response, body: ListMemberUserDto) {
    delete body.pageNum
    delete body.pageSize
    const list = await this.findAll(body)
    const options = {
      sheetName: 'App 用户信息表',
      data: list.data.rows,
      header: [
        { title: '用户账号', dataIndex: 'userName' },
        { title: '用户昵称', dataIndex: 'nickName' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '手机号码', dataIndex: 'phonenumber' },
        { title: '性别', dataIndex: 'sex' },
        { title: '状态（0正常 1关闭）', dataIndex: 'status' },
        { title: '最后登录IP', dataIndex: 'loginIp' },
        { title: '创建者', dataIndex: 'createBy' },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '更新者', dataIndex: 'updateBy' },
        { title: '更新时间', dataIndex: 'updateTime' },
        { title: '备注', dataIndex: 'remark' },
        { title: '头像地址', dataIndex: 'avatar' },
        { title: '最后登录时间', dataIndex: 'loginDate' },
      ],
    }
    ExportTable(options, res)
  }

  /**
   * 重置密码
   * @param body
   * @returns
   */
  async resetPwd(body: ResetPwdDto) {
    if (body.password) {
      body.password = await bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
    }
    await this.update(body)

    return ResultData.ok()
  }
}
