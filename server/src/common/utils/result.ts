import { ApiProperty } from '@nestjs/swagger'

export const SUCCESS_CODE = 200

/**
 * 响应结构
 * ok 成功
 * fail 失败
 */
export class ResultData<T> {
  constructor(code = SUCCESS_CODE, msg?: string, data?: T) {
    this.code = code
    this.msg = msg || '操作成功'
    this.data = data || null
  }

  @ApiProperty({ type: 'number', default: SUCCESS_CODE })
  code: number

  @ApiProperty({ type: 'string', default: '操作成功' })
  msg?: string

  data?: T

  static ok<T>(data?: T, msg?: string) {
    return new ResultData(SUCCESS_CODE, msg, data)
  }

  static fail<T>(code: number, msg?: string, data?: T) {
    return new ResultData(code || 500, msg || 'fail', data)
  }

  static rows<T>(data: { rows: T[], total: number, [key: string]: any }, msg?: string) {
    return new ResultData(SUCCESS_CODE, msg || '查询成功', data)
  }
}
