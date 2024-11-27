import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { Captcha } from 'src/common/decorators/captcha.decorator'
import { ClientInfoDto } from 'src/common/decorators/common.decorator'
import { CacheEvict, CacheRefresh } from 'src/common/decorators/redis.decorator'
import { PagingDto } from 'src/common/dto'
import { GenerateUUID, mergeDeep } from 'src/common/utils'
import { ResultData } from 'src/common/utils/result'
import { RedisService } from 'src/module/common/redis/redis.service'
import { ExtendsLogService } from 'src/module/extends/log/log.service'
import { Repository } from 'typeorm'
import { DelFlagEnum, LOGIN_TOKEN_EXPIRESIN, MEMBER_ENUM, StatusEnum } from '../member.enum'
import { MemberUserType } from '../member-user/member-user.dto'
import { MemberUserEntity } from '../member-user/member-user.entity'
import { TagUserService } from '../tag-user/tag-user.service'
import { LoginDto, RegisterDto, UpdateProfileDto, UpdatePwdDto } from './app-member-user.dto'
import { EmitAppMemberUserEvent } from './app-member-user.subscriber'

type DeepPartial<T> = T extends any[] ? T : { [P in keyof T]?: DeepPartial<T[P]> }

@Injectable()
export class AppMemberUserService {
  constructor(
    @InjectRepository(MemberUserEntity)
    private readonly userRepo: Repository<MemberUserEntity>,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly logService: ExtendsLogService,
    @Inject(forwardRef(() => TagUserService))
    private readonly tagUserService: TagUserService,
  ) { }

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
      throw new HttpException(`帐号或密码错误`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (data.delFlag === DelFlagEnum.DELETE) {
      throw new HttpException(`您已被禁用，如需正常使用请联系管理员`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (data.status === StatusEnum.STOP) {
      throw new HttpException(`您已被停用，如需正常使用请联系管理员`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const userId = data.userId

    const loginDate = new Date()
    await this.userRepo.update({ userId }, { loginDate: dayjs().format('YYYY-MM-DD HH:mm:ss'), loginIp: clientInfo.ipaddr })

    const uuid = GenerateUUID()
    const token = this.createToken({ uuid, userId })

    const tags = await this.getUserTags(userId)
    const userInfo = {
      loginTime: loginDate,
      token: uuid,
      clientInfo,
      user: data,
      tags,
    }

    await this.recordUserLoginCacheByUuid(uuid, userInfo)
    await this.recordUserLoginByUserId(uuid, userId)
    await this.updateRedisToken(userId, userInfo)

    return ResultData.ok({ token }, '登录成功')
  }

  /**
   * 更新用户标签redis缓存
   */
  @OnEvent(EmitAppMemberUserEvent.updateRedis)
  async updateUserTags(event: EmitAppMemberUserEvent) {
    const { userId } = event
    const tags = await this.getUserTags(userId)
    await this.updateRedisToken(userId, { tags })
  }

  /**
   * 记录用户ID对应的所有登录token
   * @param userId 用户ID
   * @param uuid 登录token
   */
  async recordUserLoginByUserId(uuid: string, userId: string) {
    const tokenKey = `${MEMBER_ENUM.USER}${uuid}`
    const cacheKey = `${MEMBER_ENUM.CACHE}${userId}:SET`
    await this.redisService.sAdd(`${MEMBER_ENUM.CACHE}SET`, cacheKey)
    await this.redisService.sAdd(cacheKey, tokenKey)
  }

  /**
   * 记录用户ID对应的单个登录缓存
   */
  @CacheRefresh(MEMBER_ENUM.USER, `{uuid}`, LOGIN_TOKEN_EXPIRESIN)
  async recordUserLoginCacheByUuid(uuid: string, userInfo: DeepPartial<MemberUserType>) {
    return userInfo
  }

  /**
   * 获取用户标签
   * @param userId
   * @returns
   */
  async getUserTags(userId: string) {
    const res = await this.tagUserService.findAll({ userId, status: StatusEnum.NORMAL })
    return res.data.rows.map(item => item.code)
  }

  /**
   * 从数据声明生成令牌
   *
   * @param payload 数据声明
   * @return 令牌
   */
  createToken(payload: { uuid: string, userId: string }): string {
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }

  /**
   * 从令牌中获取数据声明
   *
   * @param token 令牌
   * @return 数据声明
   */
  async parseToken(token: string) {
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

  @OnEvent(EmitAppMemberUserEvent.clearAllRedis)
  @CacheEvict(MEMBER_ENUM.USER, `*`)
  async clearAllRedis() {
    const cacheSetKeys = await this.redisService.sMembers(`${MEMBER_ENUM.CACHE}SET`)
    await this.redisService.sRemove(`${MEMBER_ENUM.CACHE}SET`, ...cacheSetKeys)
  }

  /**
   * 更新redis中的元数据
   * @param userId
   * @param token
   * @param metaData
   */
  async updateRedisToken(userId: string, metaData: DeepPartial<MemberUserType>) {
    // 获取所有登录记录
    const cacheKey = `${MEMBER_ENUM.CACHE}${userId}:SET`
    const loginTokens = await this.redisService.sMembers(cacheKey)
    const oldMetaDatas = await this.redisService.mget(loginTokens)
    // 合并新旧元数据
    for (let i = 0; i < loginTokens.length; i++) {
      const token = loginTokens[i]
      const oldMetaData = oldMetaDatas[i]

      if (!oldMetaData) {
        // 登出的token,从集合中移除
        await this.redisService.sRemove(cacheKey, token)
        continue
      }

      // 合并新旧元数据并更新
      const newMetaData = mergeDeep({}, oldMetaData, metaData)
      await this.redisService.set(token, newMetaData, LOGIN_TOKEN_EXPIRESIN)
    }
  }

  /**
   * 退出登陆
   */
  @CacheEvict(MEMBER_ENUM.USER, `{user.user.userId}`)
  async logout(user: MemberUserType) {
    return ResultData.ok(true)
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
      throw new HttpException(`保存用户'${user.userName}'失败，注册账号已存在`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.userRepo.save({ ...user, loginDate: dayjs().format('YYYY-MM-DD HH:mm:ss') })
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
    const res = await this.userRepo.findOne({ where: { userId: user.user.userId } })
    await this.updateRedisToken(user.user.userId, { user: res })
    return ResultData.ok(res)
  }

  /**
   * 个人中心-修改密码
   * @param user
   * @param updatePwdDto
   * @returns
   */
  async updatePwd(user: MemberUserType, updatePwdDto: UpdatePwdDto) {
    if (updatePwdDto.oldPassword === updatePwdDto.newPassword) {
      throw new HttpException('新密码不能与旧密码相同', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (bcrypt.compareSync(user.user.password, updatePwdDto.oldPassword)) {
      throw new HttpException('修改密码失败，旧密码错误', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const password = await bcrypt.hashSync(updatePwdDto.newPassword, bcrypt.genSaltSync(10))
    await this.userRepo.update({ userId: user.user.userId }, { password })

    return ResultData.ok()
  }
}
