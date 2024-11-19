import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { blobJSONTransformer } from 'src/common/entities/transformer';
import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('extends_log', {
  comment: '操作日志记录',
})
export class LogEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '日志主键' })
  public id: number;

  @Column({ type: 'varchar', name: 'class_method_title', length: 50, default: '', comment: '模块标题' })
  public classMethodTitle: string;

  @Column({ type: 'varchar', name: 'class_method', length: 100, default: '', comment: '方法名称' })
  public classMethod: string;

  @Column({ type: 'varchar', name: 'handle_url', length: 255, default: '', comment: '请求URL' })
  public handleUrl: string;

  @Column({ type: 'varchar', name: 'handle_method', length: 10, default: '', comment: '请求方式' })
  public handleMethod: string;

  @Column({ type: 'varchar', name: 'handle_remote_ip', length: 255, default: '', comment: '主机地址' })
  public handleRemoteIp: string;

  @Column({ type: 'varchar', name: 'handle_ua', length: 255, default: '', comment: '主机地址' })
  public handleUa: string;

  @Column({ type: 'blob', name: 'handle_param', nullable: true, comment: '请求参数', transformer: blobJSONTransformer })
  public handleParam: any;

  @Column({ type: 'blob', name: 'handle_result', nullable: true, comment: '返回参数 blob', transformer: blobJSONTransformer })
  public handleResult: any;

  @Column({ type: 'blob', name: 'handle_error_msg', nullable: true, comment: '错误消息', transformer: blobJSONTransformer })
  public handleErrorMsg: any;

  @Column({ type: 'int', name: 'handle_cost_time', default: 0, comment: '消耗时间' })
  public handleCostTime: number;

  @ApiProperty({ type: String, description: '操作者' })
  @Column({ type: 'varchar', name: 'create_by', length: 64, default: '', comment: '操作者' })
  public createBy: string;

  @ApiProperty({ type: Date, description: '操作时间' })
  @CreateDateColumn({ type: 'datetime', name: 'create_time', default: null, comment: '操作时间' })
  public createTime: Date;
}
