import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseMembarEntity } from '../member.entity'

@Entity('member_tag', {
  comment: '用户标签表',
})
export class TagEntity extends BaseMembarEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: '标签ID' })
  public id: string

  @Column({ type: 'varchar', name: 'name', length: 30, nullable: false, comment: '标签显示名' })
  public name: string

  @Column({ type: 'varchar', name: 'code', length: 30, nullable: false, comment: '标签code' })
  public code: string
}
