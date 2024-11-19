import { IsString, IsEnum, IsOptional, MinLength, MaxLength, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class LoginDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  userName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  uuid?: string;
}

export class RegisterDto extends LoginDto {}

export class UpdateProfileDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phonenumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class UpdatePwdDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  oldPassword: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  newPassword: string;
}
