import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseMembarEntity } from '../member.entity';

@Entity('member_group', {
  comment: '用户分组表',
})
export class GroupEntity extends BaseMembarEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: '分组ID' })
  public id: number;

  @Column({ type: 'varchar', name: 'name', length: 30, nullable: false, comment: '分组显示名' })
  public name: string;

  @Column({ type: 'int', name: 'max', default: 0, comment: '分组最大人数' })
  public max: number;
}
