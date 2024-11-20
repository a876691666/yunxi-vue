import { BaseEntity, PageQuery } from '@/api/base';

export interface GroupVO {
  /**
   * 状态
   */
  status: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 模块标志
   */
  module: string;
  /**
   * 分组显示名
   */
  name: string;
  /**
   * 分组最大人数
   */
  max: number;
  /**
   * 创建者
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 更新者
   */
  updateBy: string;
  /**
   * 更新时间
   */
  updateTime: string;
}

export interface GroupForm extends BaseEntity {
  /**
   * 备注
   */
  remark?: string;
  /**
   * 模块标志
   */
  module?: string;
  /**
   * 分组显示名
   */
  name?: string;
  /**
   * 分组最大人数
   */
  max?: number;
}

export interface GroupQuery extends PageQuery {
  /**
   * 状态
   */
  status?: string;
  /**
   * 分组ID
   */
  id?: string;
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
