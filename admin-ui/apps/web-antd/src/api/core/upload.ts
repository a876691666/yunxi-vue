import { requestClient } from '#/api/request';

/**
 * 通过单文件上传接口
 * @param file 上传的文件
 * @returns 上传结果
 */
export function uploadApi(file: Blob | File) {
  return requestClient.upload('/resource/oss/upload', { file });
}
/**
 * 默认上传结果
 */
export interface UploadResult {
  url: string;
  fileName: string;
  ossId: string;
}
