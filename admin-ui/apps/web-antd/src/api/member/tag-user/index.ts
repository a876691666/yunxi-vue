import type { TagUserVO, TagUserForm, TagUserQuery } from './model';

import type { ID, IDS } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询用户标签映射表列表
* @param params
* @returns 用户标签映射表列表
*/
export function tagUserList(params?: TagUserQuery) {
  return requestClient.get<TagUserVO[]>(`/member/tag-user/list`, { params });
}
/**
 * 导出用户标签映射表列表
 * @param params
 * @returns 用户标签映射表列表
 */
export function tagUserExport(params?: TagUserQuery) {
  return commonExport('/member/tag-user/export', params ?? {});
}

/**
 * 查询用户标签映射表详情
 * @param userId id
 * @returns 用户标签映射表详情
 */
export function tagUserInfo(userId: ID) {
  return requestClient.get<TagUserVO>(`/member/tag-user/${userId}`);
}

/**
 * 新增用户标签映射表
 * @param data
 * @returns void
 */
export function tagUserAdd(data: TagUserForm) {
  return requestClient.postWithMsg<void>('/member/tag-user', data);
}

/**
 * 更新用户标签映射表
 * @param data
 * @returns void
 */
export function tagUserUpdate(data: TagUserForm) {
  return requestClient.putWithMsg<void>('/member/tag-user', data);
}

/**
 * 删除用户标签映射表
 * @param userId id
 * @returns void
 */
export function tagUserRemove(userId: ID | IDS, tagId: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/member/tag-user/${userId}/${tagId}`);
}
