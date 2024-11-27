import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PagingDto } from 'src/common/dto'

export class CreateTagUserDto {
  @ApiProperty({ required: true, description: '用户ID' })
  @IsString()
  userId: string

  @ApiProperty({ required: true, description: '标签ID' })
  @IsString()
  tagId: string

  @ApiProperty({ required: false, description: '禁止状态' })
  @IsOptional()
  @IsString()
  status?: string
}

export class UpdateTagUserDto {
  @ApiProperty({ required: true, description: '主键' })
  @IsString()
  userId: string

  @ApiProperty({ required: true, description: '禁止状态' })
  @IsString()
  status: string

  @ApiProperty({ required: true, description: '标签ID' })
  @IsString()
  tagId: string
}

export class ListTagUserDto extends PagingDto {
  @ApiProperty({ required: false, description: '禁止状态' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: true, description: '用户ID' })
  @IsString()
  userId: string
}
