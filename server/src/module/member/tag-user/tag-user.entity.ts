import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('member_tag_user', {
  comment: '用户标签映射表',
})
export class TagUserEntity {
  @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' })
  public userId: string

  @PrimaryColumn({ type: 'bigint', name: 'tag_id', comment: '标签ID' })
  public tagId: string

  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '禁止状态' })
  public status: string
}
