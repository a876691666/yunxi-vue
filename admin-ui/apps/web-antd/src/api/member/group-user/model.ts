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
  /**
   * 分组ID
   */
  groupId: string;
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
  /**
   * 分组ID
   */
  groupId?: string;
  /**
   * 用户ID
   */
  userId?: string;
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
   * 分组ID
   */
  groupId?: string;
  /**
   * 用户ID
   */
  userId?: string;
  /**
   * 日期范围参数
   */
  params?: any;
}
