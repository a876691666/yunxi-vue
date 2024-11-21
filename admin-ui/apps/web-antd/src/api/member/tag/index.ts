import type { TagVO, TagForm, TagQuery } from './model';

import type { ID, IDS } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询用户标签表列表
* @param params
* @returns 用户标签表列表
*/
export function tagList(params?: TagQuery) {
  return requestClient.get<TagVO[]>(`/member/tag/list`, { params });
}
/**
 * 导出用户标签表列表
 * @param params
 * @returns 用户标签表列表
 */
export function tagExport(params?: TagQuery) {
  return commonExport('/member/tag/export', params ?? {});
}

/**
 * 查询用户标签表详情
 * @param id id
 * @returns 用户标签表详情
 */
export function tagInfo(id: ID) {
  return requestClient.get<TagVO>(`/member/tag/${id}`);
}

/**
 * 新增用户标签表
 * @param data
 * @returns void
 */
export function tagAdd(data: TagForm) {
  return requestClient.postWithMsg<void>('/member/tag', data);
}

/**
 * 更新用户标签表
 * @param data
 * @returns void
 */
export function tagUpdate(data: TagForm) {
  return requestClient.putWithMsg<void>('/member/tag', data);
}

/**
 * 删除用户标签表
 * @param id id
 * @returns void
 */
export function tagRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/member/tag/${id}`);
}
