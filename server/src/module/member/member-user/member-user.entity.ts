import { Exclude } from 'class-transformer'
import { BaseEntity } from 'src/common/entities/base'
import { stringDateTransformer } from 'src/common/entities/transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_user', {
  comment: 'App 用户信息表',
})
export class MemberUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id', comment: '用户ID' })
  public userId: number

  @Column({ type: 'varchar', name: 'user_name', length: 30, nullable: false, comment: '用户账号' })
  public userName: string

  @Column({ type: 'varchar', name: 'nick_name', length: 30, nullable: false, comment: '用户昵称' })
  public nickName: string

  @Column({ type: 'varchar', name: 'email', length: 50, default: '', comment: '邮箱' })
  public email: string

  @Column({ type: 'varchar', name: 'phonenumber', default: '', length: 11, comment: '手机号码' })
  public phonenumber: string

  // 0男 1女 2未知
  @Column({ type: 'char', name: 'sex', default: '0', length: 1, comment: '性别' })
  public sex: string

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '用户登录密码' })
  public password: string

  @Column({ type: 'varchar', name: 'login_ip', length: 128, default: '', comment: '最后登录IP' })
  public loginIp: string

  @Column({ type: 'varchar', name: 'avatar', nullable: true, comment: '头像地址' })
  public avatar: string

  @Column({ type: 'timestamp', name: 'loginDate', nullable: true, comment: '最后登录时间', transformer: stringDateTransformer })
  public loginDate: string

  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '状态（0正常 1关闭）' })
  public status: string
}
