import type { GroupUserVO, GroupUserForm, GroupUserQuery } from './model';

import type { ID, IDS } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询用户分组映射表列表
* @param params
* @returns 用户分组映射表列表
*/
export function groupUserList(params?: GroupUserQuery) {
  return requestClient.get<GroupUserVO[]>(`/member/group-user/list`, { params });
}
/**
 * 导出用户分组映射表列表
 * @param params
 * @returns 用户分组映射表列表
 */
export function groupUserExport(params?: GroupUserQuery) {
  return commonExport('/member/group-user/export', params ?? {});
}

/**
 * 查询用户分组映射表详情
 * @param userId id
 * @returns 用户分组映射表详情
 */
export function groupUserInfo(userId: ID) {
  return requestClient.get<GroupUserVO>(`/member/group-user/${userId}`);
}

/**
 * 新增用户分组映射表
 * @param data
 * @returns void
 */
export function groupUserAdd(data: GroupUserForm) {
  return requestClient.postWithMsg<void>('/member/group-user', data);
}

/**
 * 更新用户分组映射表
 * @param data
 * @returns void
 */
export function groupUserUpdate(data: GroupUserForm) {
  return requestClient.putWithMsg<void>('/member/group-user', data);
}

/**
 * 删除用户分组映射表
 * @param userId id
 * @param groupId id
 * @returns void
 */
export function groupUserRemove(userId: ID | IDS, groupId: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/member/group-user/${userId}/${groupId}`);
}
