import type { TagVO, TagForm, TagQuery, TagOption } from './model';

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

/**
 * 查询用户标签表作为下拉框数据
 * @returns 用户标签表下拉框数据
 */
export function tagOptions(name?: string) {
  return requestClient.get<TagOption[]>('/member/tag/options', { params: { name } });
}
/**
 * 查询用户分组表作为下拉框数据
 * @returns 用户分组表下拉框数据
 */
export function groupOptions(name?: string) {
  return requestClient.get<TagOption[]>('/member/group/options', { params: { name } });
}
