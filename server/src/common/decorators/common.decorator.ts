import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import { GetNowDate } from 'src/common/utils'
import * as Useragent from 'useragent'

export const ClientInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const agent = Useragent.parse(request.headers['user-agent'])
  const os = agent.os.toJSON().family
  const browser = agent.toAgent()

  const clientInfo = {
    userAgent: request.headers['user-agent'],
    ipaddr: request.ip,
    browser,
    os,
    loginLocation: '',

    dateTime: GetNowDate(),
    userName: request.user?.user?.userName,
  }

  return clientInfo
})

export interface ClientInfoDto {
  userAgent: string
  ipaddr: string
  browser: string
  os: string
  loginLocation: string
  dateTime: string
  userName?: string
}
