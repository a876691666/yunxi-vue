import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator'
import { PagingDto } from 'src/common/dto'
import { MemberUserEntity } from './member-user.entity'

export class CreateMemberUserDto {
  @ApiProperty({ required: true })
  @IsString()
  userName: string

  @ApiProperty({ required: true })
  @IsString()
  nickName: string

  @ApiProperty({ required: true })
  @IsString()
  email: string

  @ApiProperty({ required: true })
  @IsString()
  phonenumber: string

  @ApiProperty({ required: true })
  @IsString()
  sex: string

  @ApiProperty({ required: true })
  @IsString()
  password: string

  @ApiProperty({ required: true })
  @IsString()
  status: string

  @ApiProperty({ required: true })
  @IsString()
  delFlag: string

  @ApiProperty({ required: true })
  @IsString()
  loginIp: string

  @ApiProperty({ required: true })
  @IsString()
  createBy: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createTime?: Date

  @ApiProperty({ required: true })
  @IsString()
  updateBy: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updateTime?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number

  @ApiProperty({ required: true })
  @IsString()
  avatar: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  loginDate?: Date
}

export class UpdateMemberUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  userId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nickName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({ required: false })
  @MaxLength(11)
  @IsOptional()
  @IsString()
  phonenumber?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sex?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  delFlag?: string
}

export class ListMemberUserDto extends PagingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userName: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nickName: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phonenumber: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sex: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  delFlag: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  loginIp: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  createBy: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createTime?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updateBy: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updateTime?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  loginDate?: Date
}

export class ResetPwdDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  userId: number

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(5, 20)
  password: string
}

export interface MemberUserType {
  token: string
  user: MemberUserEntity
}
