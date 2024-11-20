import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PagingDto } from 'src/common/dto'

export class CreateGroupDto {

  @ApiProperty({ required: false, description: '删除标志' })
  @IsOptional()
  @IsString()
  delFlag?: string

  @ApiProperty({ required: false, description: '状态' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false, description: '模块标志' })
  @IsOptional()
  @IsString()
  module?: string

  @ApiProperty({ required: false, description: '分组ID' })
  @IsOptional()
  @IsNumber()
  id?: number

  @ApiProperty({ required: false, description: '分组显示名' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false, description: '分组最大人数' })
  @IsOptional()
  @IsNumber()
  max?: number

  @ApiProperty({ required: false, description: '创建者' })
  @IsOptional()
  @IsString()
  createBy?: string

  @ApiProperty({ required: false, description: '创建时间' })
  @IsOptional()
  @IsDate()
  createTime?: Date

  @ApiProperty({ required: false, description: '更新者' })
  @IsOptional()
  @IsString()
  updateBy?: string

  @ApiProperty({ required: false, description: '更新时间' })
  @IsOptional()
  @IsDate()
  updateTime?: Date

}

export class UpdateGroupDto extends CreateGroupDto {
  @ApiProperty({ required: true, description: '主键' })
  @IsNumber()
  id: number
}

export class ListGroupDto extends PagingDto {

}
