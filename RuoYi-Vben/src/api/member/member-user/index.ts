import { defHttp } from '@/utils/http/axios';
import { ID, IDS, PageQuery, commonExport } from '@/api/base';
import { MemberUser, ResetPwdParam } from './model';
// import { Result } from '/#/axios';

enum Api {
  root = '/member/member-user',
  memberUserList = '/member/member-user/list',
  memberUserExport = '/member/member-user/export',
  memberUserRefreshCache = '/member/member-user/refreshCache',
  memberUserInfoByKey = '/member/member-user/configKey',
  memberUserResetPassword = '/member/member-user/resetPwd',
}

export function memberUserList(params?: PageQuery) {
  return defHttp.get<MemberUser>({ url: Api.memberUserList, params });
}

export function memberUserInfo(configId: ID) {
  return defHttp.get<MemberUser>({ url: Api.root + '/' + configId });
}

export function memberUserExport(data: any) {
  return commonExport(Api.memberUserExport, data);
}

export function memberUserRefreshCache() {
  return defHttp.deleteWithMsg<void>({ url: Api.memberUserRefreshCache });
}

export function memberUserUpdate(data: any) {
  return defHttp.putWithMsg<void>({ url: Api.root, data });
}

export function memberUserAdd(data: any) {
  return defHttp.postWithMsg<void>({ url: Api.root, data });
}

export function memberUserRemove(configIds: IDS) {
  return defHttp.deleteWithMsg<void>({ url: Api.root + '/' + configIds });
}

/**
 * 返回结果是在msg里???
 * @param configKey configKey
 * @returns
 */
export function memberUserInfoByKey(configKey: string) {
  return defHttp.get<MemberUser>({ url: Api.memberUserInfoByKey + '/' + configKey });
}

/**
 * 重置用户密码
 * @param data
 * @returns
 */
export function memberUserResetPassword(data: ResetPwdParam) {
  return defHttp.putWithMsg<void>({ url: Api.memberUserResetPassword, data });
}
