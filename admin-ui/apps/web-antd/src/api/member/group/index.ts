import type { GroupVO, GroupForm, GroupQuery } from './model';

import type { ID, IDS } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询用户分组表列表
* @param params
* @returns 用户分组表列表
*/
export function groupList(params?: GroupQuery) {
  return requestClient.get<GroupVO[]>(`/member/group/list`, { params });
}
/**
 * 导出用户分组表列表
 * @param params
 * @returns 用户分组表列表
 */
export function groupExport(params?: GroupQuery) {
  return commonExport('/member/group/export', params ?? {});
}

/**
 * 查询用户分组表详情
 * @param id id
 * @returns 用户分组表详情
 */
export function groupInfo(id: ID) {
  return requestClient.get<GroupVO>(`/member/group/${id}`);
}

/**
 * 新增用户分组表
 * @param data
 * @returns void
 */
export function groupAdd(data: GroupForm) {
  return requestClient.postWithMsg<void>('/member/group', data);
}

/**
 * 更新用户分组表
 * @param data
 * @returns void
 */
export function groupUpdate(data: GroupForm) {
  return requestClient.putWithMsg<void>('/member/group', data);
}

/**
 * 删除用户分组表
 * @param id id
 * @returns void
 */
export function groupRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/member/group/${id}`);
}
