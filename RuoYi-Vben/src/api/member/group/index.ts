import { defHttp } from '@/utils/http/axios';
import { ID, IDS, commonExport } from '@/api/base';
import { GroupVO, GroupForm, GroupQuery } from './model';

/**
 * 查询用户分组表列表
 * @param params
 * @returns
 */
export function groupList(params?: GroupQuery) {
  return defHttp.get<GroupVO[]>({ url: '/member/group/list', params });
}
/**
 * 导出用户分组表列表
 * @param params
 * @returns
 */
export function groupExport(params?: GroupQuery) {
  return commonExport('/member/group/export', params ?? {});
}

/**
 * 查询用户分组表详细
 * @param id id
 * @returns
 */
export function groupInfo(id: ID) {
  return defHttp.get<GroupVO>({ url: '/member/group/' + id });
}

/**
 * 新增用户分组表
 * @param data
 * @returns
 */
export function groupAdd(data: GroupForm) {
  return defHttp.postWithMsg<void>({ url: '/member/group', data });
}

/**
 * 更新用户分组表
 * @param data
 * @returns
 */
export function groupUpdate(data: GroupForm) {
  return defHttp.putWithMsg<void>({ url: '/member/group', data });
}

/**
 * 删除用户分组表
 * @param id id
 * @returns
 */
export function groupRemove(id: ID | IDS) {
  return defHttp.deleteWithMsg<void>({ url: '/member/group/' + id },);
}
