import type { MemberUserVO, MemberUserForm, MemberUserQuery } from './model';

import type { ID, IDS } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询App 用户信息表列表
* @param params
* @returns App 用户信息表列表
*/
export function memberUserList(params?: MemberUserQuery) {
  return requestClient.get<MemberUserVO[]>(`/member/member-user/list`, { params });
}
/**
 * 导出App 用户信息表列表
 * @param params
 * @returns App 用户信息表列表
 */
export function memberUserExport(params?: MemberUserQuery) {
  return commonExport('/member/member-user/export', params ?? {});
}

/**
 * 查询App 用户信息表详情
 * @param userId id
 * @returns App 用户信息表详情
 */
export function memberUserInfo(userId: ID) {
  return requestClient.get<MemberUserVO>(`/member/member-user/${userId}`);
}

/**
 * 新增App 用户信息表
 * @param data
 * @returns void
 */
export function memberUserAdd(data: MemberUserForm) {
  return requestClient.postWithMsg<void>('/member/member-user', data);
}

/**
 * 更新App 用户信息表
 * @param data
 * @returns void
 */
export function memberUserUpdate(data: MemberUserForm) {
  return requestClient.putWithMsg<void>('/member/member-user', data);
}

/**
 * 删除App 用户信息表
 * @param userId id
 * @returns void
 */
export function memberUserRemove(userId: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/member/member-user/${userId}`);
}
