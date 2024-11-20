import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PagingDto } from 'src/common/dto'

export class CreateTagDto {
  @ApiProperty({ required: false, description: '状态' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: true, description: '标签显示名' })
  @IsString()
  name: string

  @ApiProperty({ required: true, description: '标签code' })
  @IsString()
  code: string

  @ApiProperty({ required: true, description: '模块标志' })
  @IsString()
  module: string
}

export class UpdateTagDto extends CreateTagDto {
  @ApiProperty({ required: true, description: '主键' })
  @IsString()
  id: string
}

export class ListTagDto extends PagingDto {
  @ApiProperty({ required: false, description: '状态' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false, description: '标签显示名' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false, description: '标签code' })
  @IsOptional()
  @IsString()
  code?: string

  @ApiProperty({ required: false, description: '模块标志' })
  @IsOptional()
  @IsString()
  module?: string

  @ApiProperty({ required: false, description: '创建者' })
  @IsOptional()
  @IsString()
  createBy?: string

  @ApiProperty({ required: false, description: '创建时间' })
  @IsOptional()
  @IsString({ each: true })
  createTime?: string[]

  @ApiProperty({ required: false, description: '更新者' })
  @IsOptional()
  @IsString()
  updateBy?: string

  @ApiProperty({ required: false, description: '更新时间' })
  @IsOptional()
  @IsString({ each: true })
  updateTime?: string[]
}
