import type { RouteRecordName } from "vue-router";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  viewportSize: { width: number; height: number };
  sortSwap: boolean;
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
  root?: boolean;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = {
  avatar?: string;
  userName?: string;
  nickname?: string;
  roles?: Array<string>;
  permissions?: Array<string>;
  tags?: Array<string>;
  verifyCode?: string;
  currentPage?: number;
  isRemembered?: boolean;
  loginDay?: number;
  isLogin?: boolean;
};
