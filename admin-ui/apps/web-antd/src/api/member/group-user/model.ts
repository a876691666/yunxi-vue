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
  /**
   * 模块
   */
  module: string;
  /**
   * 分组名
   */
  name: string;
  /**
   * 分组状态
   */
  groupDisabled: string;
  /**
   * 备注
   */
  remark: string;
}

export interface GroupUserForm extends BaseEntity {
  /**
   * 分组ID
   */
  groupId?: string;
}

export interface GroupUserQuery extends PageQuery {
  /**
   * 禁止状态
   */
  status?: string;
}

export interface UpdateGroupUserDto {
  userId: string;
  groupId: string;
  status: string;
}
