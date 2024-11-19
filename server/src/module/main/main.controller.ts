import type { ClientInfoDto } from 'src/common/decorators/common.decorator'
import type { RedisService } from 'src/module/common/redis/redis.service'
import type { ConfigService } from 'src/module/system/config/config.service'
import type { UserDto } from 'src/module/system/user/user.decorator'
import type { MainService } from './main.service'
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ClientInfo } from 'src/common/decorators/common.decorator'
import { CacheEnum } from 'src/common/enum/index'
import { createMath } from 'src/common/utils/captcha'
import { GenerateUUID } from 'src/common/utils/index'
import { ResultData } from 'src/common/utils/result'
import { NotRequireAuth, User } from 'src/module/system/user/user.decorator'
import { LoginDto, RegisterDto } from './dto/index'

@ApiTags('根目录')
@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '用户登录',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto, @ClientInfo() clientInfo: ClientInfoDto) {
    return this.mainService.login(user, clientInfo)
  }

  @ApiOperation({
    summary: '退出登录',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @NotRequireAuth()
  @Post('/logout')
  @HttpCode(200)
  async logout(@User() user: UserDto, @ClientInfo() clientInfo: ClientInfoDto) {
    if (user?.token) {
      await this.redisService.del(`${CacheEnum.LOGIN_TOKEN_KEY}${user.token}`)
    }
    return this.mainService.logout(clientInfo)
  }

  @ApiOperation({
    summary: '用户注册',
  })
  @ApiBody({
    type: RegisterDto,
    required: true,
  })
  @Post('/register')
  @HttpCode(200)
  register(@Body() user: RegisterDto) {
    return this.mainService.register(user)
  }

  @ApiOperation({
    summary: '获取验证图片',
  })
  @Get('/captchaImage')
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
    catch {
      return ResultData.fail(500, '生成验证码错误，请重试')
    }
  }

  @ApiOperation({
    summary: '用户信息',
  })
  @Get('/getInfo')
  async getInfo(@User() user: UserDto) {
    return {
      msg: '操作成功',
      code: 200,
      permissions: user.permissions,
      roles: user.roles,
      user: user.user,
    }
  }

  @ApiOperation({
    summary: '路由信息',
  })
  @Get('/getRouters')
  getRouters(@User() user: UserDto) {
    const userId = user.user.userId.toString()
    return this.mainService.getRouters(+userId)
  }
}
