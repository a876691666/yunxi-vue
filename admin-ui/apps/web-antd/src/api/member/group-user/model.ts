import type { PageQuery, BaseEntity } from '#/api/common';

export interface GroupUserVO {
  /**
   * 级别
   */
  level: number;
  /**
   * 禁止状态
   */
  status: string;
}

export interface GroupUserForm extends BaseEntity {
  /**
   * 级别
   */
  level?: number;
  /**
   * 禁止状态
   */
  status?: string;
}

export interface GroupUserQuery extends PageQuery {
  /**
   * 级别
   */
  level?: number;
  /**
   * 禁止状态
   */
  status?: string;
  /**
   * 日期范围参数
   */
  params?: any;
}
