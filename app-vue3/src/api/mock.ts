import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

/** 地图数据 */
export const mapJson = (params?: object) => {
  return http.request<Result>("get", "/get-map-info", { params });
};

/** 文件上传 */
export const formUpload = data => {
  return http.request<{
    imgUrl: string;
  }>(
    "post",
    "/user/profile/avatar",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
