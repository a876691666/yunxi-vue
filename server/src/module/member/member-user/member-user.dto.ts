import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator'
import { PagingDto } from 'src/common/dto'
import { MemberUserEntity } from './member-user.entity'

export class CreateMemberUserDto {
  @ApiProperty({ required: true, description: '用户账号' })
  @IsString()
  userName: string

  @ApiProperty({ required: true, description: '用户昵称' })
  @IsString()
  nickName: string

  @ApiProperty({ required: false, description: '邮箱' })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber?: string

  @ApiProperty({ required: false, description: '性别' })
  @IsOptional()
  @IsString()
  sex?: string

  @ApiProperty({ required: false, description: '头像地址' })
  @IsOptional()
  @IsString()
  avatar?: string
}

export class UpdateMemberUserDto {
  @ApiProperty({ required: true, description: '主键' })
  @IsNumber()
  userId: number

  @ApiProperty({ required: false, description: '用户账号' })
  @IsOptional()
  @IsString()
  userName?: string

  @ApiProperty({ required: false, description: '用户昵称' })
  @IsOptional()
  @IsString()
  nickName?: string

  @ApiProperty({ required: false, description: '邮箱' })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber?: string

  @ApiProperty({ required: false, description: '性别' })
  @IsOptional()
  @IsString()
  sex?: string

  @ApiProperty({ required: false, description: '头像地址' })
  @IsOptional()
  @IsString()
  avatar?: string
}

export class ListMemberUserDto extends PagingDto {
  @ApiProperty({ required: false, description: '用户账号' })
  @IsOptional()
  @IsString()
  userName?: string

  @ApiProperty({ required: false, description: '用户昵称' })
  @IsOptional()
  @IsString()
  nickName?: string

  @ApiProperty({ required: false, description: '邮箱' })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({ required: false, description: '手机号码' })
  @IsOptional()
  @IsString()
  phonenumber?: string

  @ApiProperty({ required: false, description: '性别' })
  @IsOptional()
  @IsString()
  sex?: string

  @ApiProperty({ required: false, description: '状态（0正常 1关闭）' })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: '最后登录IP' })
  @IsOptional()
  @IsString()
  loginIp?: string

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

  @ApiProperty({ required: false, description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ required: false, description: '头像地址' })
  @IsOptional()
  @IsString()
  avatar?: string

  @ApiProperty({ required: false, description: '最后登录时间' })
  @IsOptional()
  @IsString({ each: true })
  loginDate?: string[]
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
