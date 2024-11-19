import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsJSON, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Min } from 'class-validator'

import { PagingDto } from 'src/common/dto/index'

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}
export enum TypeEnum {
  YES = 'Y',
  NO = 'N',
}
export class CreateConfigDto {
  @IsString()
  @Length(0, 100)
  configName: string

  @IsString()
  @Length(0, 500)
  configValue: string

  @IsString()
  @Length(0, 100)
  configKey: string

  @IsString()
  @IsEnum(TypeEnum)
  configType: string

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string
}

export class UpdateConfigDto extends CreateConfigDto {
  @IsNumber()
  configId: number
}

export class ListConfigDto extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  configName?: string

  @IsOptional()
  @IsString()
  @Length(0, 100)
  configKey?: string

  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  configType?: string
}
