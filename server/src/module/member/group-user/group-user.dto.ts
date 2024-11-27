import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PagingDto } from 'src/common/dto'

export class CreateGroupUserDto {
  @ApiProperty({ required: true, description: '用户ID' })
  @IsString()
  userId: string

  @ApiProperty({ required: true, description: '分组ID' })
  @IsString()
  groupId: string

  @ApiProperty({ required: true, description: '级别' })
  @IsNumber()
  level: number

  @ApiProperty({ required: false, description: '禁止状态' })
  @IsOptional()
  @IsString()
  status?: string
}

export class UpdateGroupUserDto {
  @ApiProperty({ required: true, description: '主键' })
  @IsString()
  userId: string

  @ApiProperty({ required: false, description: '级别' })
  @IsOptional()
  @IsNumber()
  level?: number

  @ApiProperty({ required: false, description: '禁止状态' })
  @IsOptional()
  @IsString()
  status?: string
}

export class ListGroupUserDto extends PagingDto {
  @ApiProperty({ required: true, description: '用户ID' })
  @IsString()
  userId: string

  @ApiProperty({ required: false, description: '禁止状态' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: '分组ID' })
  @IsOptional()
  @IsString()
  groupId?: string
}
