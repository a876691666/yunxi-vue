import { BaseStatusEntity } from 'src/common/entities/base';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('member_group_user', {
  comment: '用户分组映射表',
})
export class GroupWithUserEntity extends BaseStatusEntity {
  @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' })
  public userId: number;

  @PrimaryColumn({ type: 'bigint', name: 'group_id', comment: '分组ID' })
  public groupId: number;

  @Column({ type: 'int', name: 'level', default: 0, comment: '用户在分组中的级别, 0=普通用户,99=组管理,999=组长' })
  public level: string;
}