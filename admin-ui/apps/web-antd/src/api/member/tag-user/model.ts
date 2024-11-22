import type { PageQuery, BaseEntity } from '#/api/common';

export interface TagUserVO {
  /**
   * 禁止状态
   */
  status: string;
}

export interface TagUserForm extends BaseEntity {
  /**
   * 禁止状态
   */
  status?: string;

  /**
   * 用户ID
   */
  userId?: string;

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
  /**
   * 日期范围参数
   */
  params?: any;
}
