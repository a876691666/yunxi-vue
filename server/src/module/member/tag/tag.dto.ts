import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PagingDto } from 'src/common/dto'

export class CreateTagDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly name: string

  @ApiProperty({ required: true })
  @IsString()
  readonly code: string

  @ApiProperty({ required: true })
  @IsString()
  readonly module: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly remark?: string
}

export class UpdateTagDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly id: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly code?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly module?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly remark?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly status?: string
}

export class ListTagDto extends PagingDto {}
