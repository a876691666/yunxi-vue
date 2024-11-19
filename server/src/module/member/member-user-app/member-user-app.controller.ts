import type { ClientInfoDto } from 'src/common/decorators/common.decorator'
import type { PagingDto } from 'src/common/dto'
import type { RedisService } from 'src/module/common/redis/redis.service'
import type { ExtendsUploadService } from 'src/module/extends/upload/upload.service'
import type { ConfigService } from 'src/module/system/config/config.service'
import type { MemberUserType } from '../member-user/member-user.dto'
import type { UpdateProfileDto, UpdatePwdDto } from './member-user-app.dto'
import type { MemberUserService } from './member-user-app.service'
import { Body, Controller, Get, HttpCode, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ClientInfo } from 'src/common/decorators/common.decorator'
import { CacheEnum } from 'src/common/enum/index'
import { createMath } from 'src/common/utils/captcha'
import { GenerateUUID } from 'src/common/utils/index'
import { ResultData } from 'src/common/utils/result'
import { ExtendsLog } from 'src/module/extends/log/log.interceptor'
import { NotRequireAuth, User } from 'src/module/system/user/user.decorator'
import { LoginDto, RegisterDto } from './member-user-app.dto'

@ApiTags('App 用户模块')
@Controller('app-api/user')
export class MemberUserController {
  constructor(
    private readonly memberUserService: MemberUserService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly uploadService: ExtendsUploadService,
  ) {}

  @ApiOperation({
    summary: '用户登录',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @NotRequireAuth()
  @ExtendsLog()
  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto, @ClientInfo() clientInfo: ClientInfoDto) {
    return this.memberUserService.login(user, clientInfo)
  }

  @ApiOperation({
    summary: '退出登录',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @NotRequireAuth()
  @ExtendsLog()
  @Post('/logout')
  @HttpCode(200)
  async logout(@User() user: MemberUserType) {
    if (user?.token) {
      await this.redisService.del(`${CacheEnum.LOGIN_TOKEN_KEY}${user.token}`)
    }
    return this.memberUserService.logout(user)
  }

  @ApiOperation({
    summary: '用户注册',
  })
  @ApiBody({
    type: RegisterDto,
    required: true,
  })
  @NotRequireAuth()
  @ExtendsLog()
  @Post('/register')
  @HttpCode(200)
  register(@Body() user: RegisterDto) {
    return this.memberUserService.register(user)
  }

  @ApiOperation({
    summary: '获取验证图片',
  })
  @Get('/captchaImage')
  @NotRequireAuth()
  async captchaImage() {
    // 是否开启验证码
    const enable = await this.configService.getConfigValue('sys.account.captchaEnabled')
    const captchaEnabled: boolean = enable === 'true'
    const data = {
      captchaEnabled,
      img: '',
      uuid: '',
    }
    try {
      if (captchaEnabled) {
        const captchaInfo = createMath()
        data.img = captchaInfo.data
        data.uuid = GenerateUUID()
        await this.redisService.set(CacheEnum.CAPTCHA_CODE_KEY + data.uuid, captchaInfo.text.toLowerCase(), 1000 * 60 * 5)
      }
      return ResultData.ok(data, '操作成功')
    }
    catch (err) {
      return ResultData.fail(500, '生成验证码错误，请重试')
    }
  }

  @ApiOperation({
    summary: '用户信息',
  })
  @Get('/getInfo')
  async getInfo(@User() user: MemberUserType) {
    return ResultData.ok(user)
  }

  @ApiOperation({
    summary: '个人中心-用户信息',
  })
  @Get('/profile')
  profile(@User() user: MemberUserType) {
    return ResultData.ok(user)
  }

  @ApiOperation({
    summary: '个人中心-登录日志',
  })
  @Get('/loginLog')
  loginLog(@User() user: MemberUserType, @Query() query: PagingDto) {
    return this.memberUserService.loginLog(query, user)
  }

  @ApiOperation({
    summary: '个人中心-修改用户信息',
  })
  @Put('/profile')
  updateProfile(@User() user: MemberUserType, @Body() updateProfileDto: UpdateProfileDto) {
    return this.memberUserService.updateProfile(user, updateProfileDto)
  }

  @ApiOperation({
    summary: '个人中心-上传用户头像',
  })
  @Post('/profile/avatar')
  @UseInterceptors(FileInterceptor('avatarfile'))
  async avatar(@UploadedFile() avatarfile: Express.Multer.File, @User() user: MemberUserType) {
    const res = await this.uploadService.singleFileUpload(avatarfile, user, 'member-user', 'avatar')
    return ResultData.ok({ imgUrl: res.fileName })
  }

  @ApiOperation({
    summary: '个人中心-修改密码',
  })
  @Put('/profile/updatePwd')
  updatePwd(@User() user: MemberUserType, @Body() updatePwdDto: UpdatePwdDto) {
    return this.memberUserService.updatePwd(user, updatePwdDto)
  }
}
