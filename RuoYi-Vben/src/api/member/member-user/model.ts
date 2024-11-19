export interface MemberUser {
  configId: number;
  configName: string;
  configKey: string;
  configValue: string;
  configType: string;
  remark: string;
  createTime: string;
}

/**
 * @description: 重置密码
 */
export interface ResetPwdParam {
  userId: string;
  password: string;
}
