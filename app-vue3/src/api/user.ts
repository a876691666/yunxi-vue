import { http } from "@/utils/http";

export type UserResult = {
  token: string;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  nickName: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

export type UserInfoResult = {
  success: boolean;
  data: UserInfo;
};

type ResultTable = {
  /** 列表数据 */
  list: Array<any>;
  /** 总条目数 */
  total?: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 当前页数 */
  currentPage?: number;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/user/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return http.request<UserInfoResult>("get", "/mine", { data });
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return http.request<ResultTable>("get", "/user/loginLog", { params: data });
};

/** 账户设置-个人安全日志 */
export const getCaptchaImage = () => {
  return http.request<{ uuid: string; img: string }>(
    "get",
    "/user/captchaImage"
  );
};

// 退出方法
export function logout() {
  return http.request("post", "/user/logout");
}

export function updateProfile(data: any) {
  return http.request("put", "/user/profile", { data });
}

// 获取用户详细信息
export function getInfo() {
  return http.request<{
    user: {
      userName: string;
      nickName: string;
      avatar: string;
      [key: string]: any;
    };
  }>("get", "/user/getInfo");
}
