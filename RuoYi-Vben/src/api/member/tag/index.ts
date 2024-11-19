import { defHttp } from '@/utils/http/axios';
import { ID, IDS, PageQuery, commonExport } from '@/api/base';
import { Tag } from './model';
// import { Result } from '/#/axios';

enum Api {
  root = '/member/tag',
  tagList = '/member/tag/list',
  tagExport = '/member/tag/export',
  tagRefreshCache = '/member/tag/refreshCache',
  tagInfoByKey = '/member/tag/configKey',
}

export function tagList(params?: PageQuery) {
  return defHttp.get<Tag>({ url: Api.tagList, params });
}

export function tagInfo(configId: ID) {
  return defHttp.get<Tag>({ url: Api.root + '/' + configId });
}

export function tagExport(data: any) {
  return commonExport(Api.tagExport, data);
}

export function tagRefreshCache() {
  return defHttp.deleteWithMsg<void>({ url: Api.tagRefreshCache });
}

export function tagUpdate(data: any) {
  return defHttp.putWithMsg<void>({ url: Api.root, data });
}

export function tagAdd(data: any) {
  return defHttp.postWithMsg<void>({ url: Api.root, data });
}

export function tagRemove(configIds: IDS) {
  return defHttp.deleteWithMsg<void>({ url: Api.root + '/' + configIds });
}

export function tagStatusChange(id: string, status: string) {
  return defHttp.putWithMsg<void>({
    url: Api.root,
    data: { id: id, status: status },
  });
}

/**
 * 返回结果是在msg里???
 * @param configKey configKey
 * @returns
 */
export function tagInfoByKey(configKey: string) {
  return defHttp.get<Tag>({ url: Api.tagInfoByKey + '/' + configKey });
}
