import { BaseStatusEntity } from 'src/common/entities/base'
import { Entity, PrimaryColumn } from 'typeorm'

@Entity('member_tag_user', {
  comment: '用户标签映射表',
})
export class TagWithUserEntity extends BaseStatusEntity {
  @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' })
  public userId: number

  @PrimaryColumn({ type: 'bigint', name: 'tag_id', comment: '标签ID' })
  public tagId: number
}
