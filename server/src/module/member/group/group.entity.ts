import { BaseEntity } from 'src/common/entities/base'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_group', {
  comment: '用户分组表',
})
export class GroupEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'remark', comment: '备注' })
  public remark: string

  @Column({ type: 'varchar', name: 'module', comment: '模块标志' })
  public module: string

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: '分组ID' })
  public id: string | number

  @Column({ type: 'varchar', name: 'name', comment: '分组显示名' })
  public name: string

  @Column({ type: 'int', name: 'max', comment: '分组最大人数' })
  public max: number
}
