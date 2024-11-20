import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { ResultData } from 'src/common/utils/result'
import { Repository } from 'typeorm'
import { CreateMemberUserDto, ListMemberUserDto, ResetPwdDto, UpdateMemberUserDto } from './member-user.dto'
import { MemberUserEntity } from './member-user.entity'

@Injectable()
export class MemberUserService {
  constructor(
    @InjectRepository(MemberUserEntity)
    private readonly MemberUserEntityRep: Repository<MemberUserEntity>,
  ) {}

  async create(createMemberUserDto: CreateMemberUserDto) {
    const res = await this.MemberUserEntityRep.save(createMemberUserDto)
    return ResultData.ok(res)
  }

  async findAll(query: ListMemberUserDto) {
    const entity = this.MemberUserEntityRep.createQueryBuilder('entity')
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' })
    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize)
    const [list, total] = await entity.getManyAndCount()

    return ResultData.ok({
      list,
      total,
    })
  }

  async findOne(id: number) {
    const res = await this.MemberUserEntityRep.findOne({
      where: {
        delFlag: '0',
        userId: id,
      },
    })
    return ResultData.ok(res)
  }

  async update(updateMemberUserDto: UpdateMemberUserDto) {
    const res = await this.MemberUserEntityRep.update({ userId: updateMemberUserDto.userId }, updateMemberUserDto)
    return ResultData.ok(res)
  }

  async remove(id: number) {
    const data = await this.MemberUserEntityRep.update(
      { userId: id },
      {
        delFlag: '1',
      },
    )
    return ResultData.ok(data)
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
