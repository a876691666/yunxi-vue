import { defHttp } from '@/utils/http/axios';
import { ID, IDS, commonExport } from '@/api/base';
import { TagVO, TagForm, TagQuery } from './model';

/**
 * 查询用户标签表列表
 * @param params
 * @returns
 */
export function tagList(params?: TagQuery) {
  return defHttp.get<TagVO[]>({ url: '/member/tag/list', params });
}
/**
 * 导出用户标签表列表
 * @param params
 * @returns
 */
export function tagExport(params?: TagQuery) {
  return commonExport('/member/tag/export', params ?? {});
}

/**
 * 查询用户标签表详细
 * @param id id
 * @returns
 */
export function tagInfo(id: ID) {
  return defHttp.get<TagVO>({ url: '/member/tag/' + id });
}

/**
 * 新增用户标签表
 * @param data
 * @returns
 */
export function tagAdd(data: TagForm) {
  return defHttp.postWithMsg<void>({ url: '/member/tag', data });
}

/**
 * 更新用户标签表
 * @param data
 * @returns
 */
export function tagUpdate(data: TagForm) {
  return defHttp.putWithMsg<void>({ url: '/member/tag', data });
}

/**
 * 删除用户标签表
 * @param id id
 * @returns
 */
export function tagRemove(id: ID | IDS) {
  return defHttp.deleteWithMsg<void>({ url: '/member/tag/' + id },);
}
