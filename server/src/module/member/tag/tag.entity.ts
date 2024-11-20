import { BaseEntity } from 'src/common/entities/base'
import { stringDateTransformer } from 'src/common/entities/transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_tag', {
  comment: '用户标签表',
})
export class TagEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', comment: '标签显示名' })
  public name: string

  @Column({ type: 'varchar', name: 'code', comment: '标签code' })
  public code: string

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: '标签ID' })
  public id: string

  @Column({ type: 'varchar', name: 'module', comment: '模块标志' })
  public module: string

  @Column({ type: 'char', name: 'delFlag', comment: '删除标志' })
  public delFlag: string

  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '禁用状态' })
  public status: string
}
