import type { PageQuery, BaseEntity } from '#/api/common';

export interface TagUserVO {
  /**
   * 级别
   */
  level: number;
  /**
   * 禁止状态
   */
  status: string;
  /**
   * 标签ID
   */
  tagId: string;
  /**
   * 模块
   */
  module: string;
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签状态
   */
  tagDisabled: string;
  /**
   * 备注
   */
  remark: string;
}

export interface TagUserForm extends BaseEntity {
  /**
   * 标签ID
   */
  tagId?: string;
}

export interface TagUserQuery extends PageQuery {
  /**
   * 禁止状态
   */
  status?: string;
}

export interface UpdateTagUserDto {
  userId: string;
  tagId: string;
  status: string;
}
