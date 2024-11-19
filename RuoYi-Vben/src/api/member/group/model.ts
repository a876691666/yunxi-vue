import { BaseEntity, PageQuery } from '@/api/base';

export interface groupVO {
  /**
   * 删除标志
   */
  delFlag: string;
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
   * 分组ID
   */
  id: string | number;
  /**
   * 分组显示名
   */
  name: string;
  /**
   * 分组最大人数
   */
  max: string;
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

export interface groupForm extends BaseEntity {
  /**
   * 删除标志
   */
  delFlag?: string;
  /**
   * 状态
   */
  status?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 模块标志
   */
  module?: string;
  /**
   * 分组ID
   */
  id?: string | number;
  /**
   * 分组显示名
   */
  name?: string;
  /**
   * 分组最大人数
   */
  max?: string;
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
}

export interface groupQuery extends PageQuery {
  /**
   * 删除标志
   */
  delFlag?: string;
  /**
   * 状态
   */
  status?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 模块标志
   */
  module?: string;
  /**
   * 分组ID
   */
  id?: string | number;
  /**
   * 分组显示名
   */
  name?: string;
  /**
   * 分组最大人数
   */
  max?: string;
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
