import type { PageQuery, BaseEntity } from '#/api/common';

export interface TagVO {
  /**
   * 状态
   */
  status: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 标签显示名
   */
  name: string;
  /**
   * 标签code
   */
  code: string;
  /**
   * 模块标志
   */
  module: string;
}

export interface TagOption {
  id: string;
  name: string;
}

export interface TagForm extends BaseEntity {
  /**
   * 状态
   */
  status?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 标签显示名
   */
  name?: string;
  /**
   * 标签code
   */
  code?: string;
  /**
   * 模块标志
   */
  module?: string;
}

export interface TagQuery extends PageQuery {
  /**
   * 状态
   */
  status?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 标签显示名
   */
  name?: string;
  /**
   * 标签code
   */
  code?: string;
  /**
   * 模块标志
   */
  module?: string;
  /**
   * 创建者
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 更新者
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 日期范围参数
   */
  params?: any;
}
