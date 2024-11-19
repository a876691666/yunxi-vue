import { ApiProperty } from '@nestjs/swagger'

import { BaseEntity } from 'src/common/entities/base'
import { Column, Entity } from 'typeorm'

export abstract class BaseMembarEntity extends BaseEntity {
  @ApiProperty({ type: String, description: '模块标志' })
  @Column({ type: 'varchar', name: 'module', nullable: false, length: 64, comment: '模块标志' })
  public module: string

  @ApiProperty({ type: String, description: '备注' })
  @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
  public remark: string
}
