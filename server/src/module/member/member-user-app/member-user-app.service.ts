import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Captcha } from 'src/common/decorators/captcha.decorator'
import { ClientInfoDto } from 'src/common/decorators/common.decorator'
import { CacheEvict } from 'src/common/decorators/redis.decorator'
import { PagingDto } from 'src/common/dto'
import { CacheEnum } from 'src/common/enum'
import { GenerateUUID, mergeDeep } from 'src/common/utils'
import { ResultData } from 'src/common/utils/result'
import { RedisService } from 'src/module/common/redis/redis.service'
import { ExtendsLogService } from 'src/module/extends/log/log.service'
import { Repository } from 'typeorm'
import { DelFlagEnum, LOGIN_TOKEN_EXPIRESIN, MEMBER_ENUM, StatusEnum } from '../member.enum'
import { MemberUserType } from '../member-user/member-user.dto'
import { MemberUserEntity } from '../member-user/member-user.entity'
import { LoginDto, RegisterDto, UpdateProfileDto, UpdatePwdDto } from './member-user-app.dto'

type DeepPartial<T> = T extends any[] ? T : { [P in keyof T]?: DeepPartial<T[P]> }

@Injectable()
export class MemberUserService {
  constructor(
    @InjectRepository(MemberUserEntity)
    private readonly userRepo: Repository<MemberUserEntity>,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly logService: ExtendsLogService,
  ) { }

  @CacheEvict(MEMBER_ENUM.USER, '{userId}')
  clearCacheByUserId(userId: number) {
    return userId
  }

  /**
   * 登陆
   * @param user
   * @returns
   */
  @Captcha('user')
  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    const data = await this.userRepo.findOne({
      where: { userName: user.userName },
    })

    if (!(data && bcrypt.compareSync(user.password, data.password))) {
      return ResultData.fail(500, `帐号或密码错误`)
    }
    if (data.delFlag === DelFlagEnum.DELETE) {
      return ResultData.fail(500, `您已被禁用，如需正常使用请联系管理员`)
    }
    if (data.status === StatusEnum.STOP) {
      return ResultData.fail(500, `您已被停用，如需正常使用请联系管理员`)
    }

    const userId = data.userId
    this.clearCacheByUserId(userId)

    const loginDate = new Date()
    await this.userRepo.update({ userId }, { loginDate, loginIp: clientInfo.ipaddr })

    const uuid = GenerateUUID()
    const token = this.createToken({ uuid, userId })

    const userInfo = {
      loginTime: loginDate,
      token: uuid,
      clientInfo,
      user: data,
    }

    await this.updateRedisToken(uuid, userInfo)

    return ResultData.ok({ token }, '登录成功')
  }

  /**
   * 从数据声明生成令牌
   *
   * @param payload 数据声明
   * @return 令牌
   */
  createToken(payload: { uuid: string, userId: number }): string {
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }

  /**
   * 从令牌中获取数据声明
   *
   * @param token 令牌
   * @return 数据声明
   */
  parseToken(token: string) {
    try {
      if (!token)
        return null
      const payload = this.jwtService.verify(token.replace('Bearer ', ''))
      return payload
    }
    catch (error) {
      ((_e) => { })(error)
      return null
    }
  }

  /**
   * 更新redis中的元数据
   * @param token
   * @param metaData
   */
  async updateRedisToken(token: string, metaData: DeepPartial<MemberUserType>) {
    const oldMetaData = await this.redisService.get(`${CacheEnum.LOGIN_TOKEN_KEY}${token}`)

    let newMetaData = metaData
    if (oldMetaData) {
      newMetaData = mergeDeep({}, oldMetaData, metaData)
    }

    await this.redisService.set(`${CacheEnum.LOGIN_TOKEN_KEY}${token}`, newMetaData, LOGIN_TOKEN_EXPIRESIN)
  }

  /**
   * 退出登陆
   */
  @CacheEvict(MEMBER_ENUM.USER, '{user.userId}')
  @CacheEvict(CacheEnum.LOGIN_TOKEN_KEY, '{user.token}')
  async logout(_user: MemberUserType) {
    return ResultData.ok()
  }

  /**
   * 注册
   * @param user
   */
  async register(user: RegisterDto) {
    const checkUserNameUnique = await this.userRepo.findOne({
      where: { userName: user.userName },
      select: ['userName'],
    })
    if (checkUserNameUnique) {
      return ResultData.fail(500, `保存用户'${user.userName}'失败，注册账号已存在`)
    }
    await this.userRepo.save({ ...user, loginDate: new Date() })
    return ResultData.ok()
  }

  /**
   * 登陆记录
   */
  loginRecord() { }

  /**
   * 个人中心-用户信息
   * @param user
   */
  async profile(user) {
    return ResultData.ok(user)
  }

  /**
   * 个人中心-用户信息
   * @param query
   * @param user
   */
  async loginLog(query: PagingDto, user: MemberUserType) {
    const result = await this.logService.findAll(query, { createBy: user.user.userName })
    return result
  }

  /**
   * 个人中心-用户信息
   * @param user
   * @returns
   */
  async updateProfile(user: MemberUserType, updateProfileDto: UpdateProfileDto) {
    await this.userRepo.update({ userId: user.user.userId }, updateProfileDto)
    await this.updateRedisToken(user.token, { user: updateProfileDto })
    return ResultData.ok()
  }

  /**
   * 个人中心-修改密码
   * @param user
   * @param updatePwdDto
   * @returns
   */
  async updatePwd(user: MemberUserType, updatePwdDto: UpdatePwdDto) {
    if (updatePwdDto.oldPassword === updatePwdDto.newPassword) {
      return ResultData.fail(500, '新密码不能与旧密码相同')
    }
    if (bcrypt.compareSync(user.user.password, updatePwdDto.oldPassword)) {
      return ResultData.fail(500, '修改密码失败，旧密码错误')
    }

    const password = await bcrypt.hashSync(updatePwdDto.newPassword, bcrypt.genSaltSync(10))
    await this.userRepo.update({ userId: user.user.userId }, { password })
    await this.updateRedisToken(user.token, { user: { password } })
    return ResultData.ok()
  }
}
