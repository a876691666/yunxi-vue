import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Min } from 'class-validator'

export class OnlineListDto {
  @ApiProperty({ required: false })
  @IsNumberString()
  pageNum: number

  @ApiProperty({ required: false })
  @IsNumberString()
  pageSize: number

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string
}
