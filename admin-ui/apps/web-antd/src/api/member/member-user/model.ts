import type { PageQuery, BaseEntity } from '#/api/common';

export interface MemberUserVO {
  /**
   * 用户账号
   */
  userName: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 手机号码
   */
  phonenumber: string;
  /**
   * 性别
   */
  sex: string;
  /**
   * 状态（0正常 1关闭）
   */
  status: string;
  /**
   * 最后登录IP
   */
  loginIp: string;
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
  /**
   * 备注
   */
  remark: string;
  /**
   * 头像地址
   */
  avatar: string;
  /**
   * 最后登录时间
   */
  loginDate: string;
}

export interface MemberUserForm extends BaseEntity {
  /**
   * 用户账号
   */
  userName?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 头像地址
   */
  avatar?: string;
}

export interface MemberUserQuery extends PageQuery {
  /**
   * 用户账号
   */
  userName?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 状态（0正常 1关闭）
   */
  status?: string;
  /**
   * 最后登录IP
   */
  loginIp?: string;
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
   * 备注
   */
  remark?: string;
  /**
   * 头像地址
   */
  avatar?: string;
  /**
   * 最后登录时间
   */
  loginDate?: string;
  /**
   * 日期范围参数
   */
  params?: any;
}
