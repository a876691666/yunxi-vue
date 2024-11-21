<script lang="ts" setup>
import type { UploadFile, UploadProps } from 'ant-design-vue';
import type { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';

import { ref, toRefs, watch } from 'vue';

import { $t } from '@vben/locales';

import { PlusOutlined } from '@ant-design/icons-vue';
import { message, Modal, Upload } from 'ant-design-vue';
import { isArray, isFunction, isObject, isString } from 'lodash-es';

import { uploadApi } from '#/api';

import { checkImageFileType, defaultImageAccept } from './helper';
import { UploadResultStatus } from './typing';
import { useUploadType } from './use-upload';

defineOptions({ name: 'ImageUpload', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /**
     * 包括拓展名(不带点) 文件头(image/png等 不包括泛写法即image/*)
     */
    accept?: string[];
    api?: (...args: any[]) => Promise<any>;
    disabled?: boolean;
    helpText?: string;
    // eslint-disable-next-line no-use-before-define
    listType?: ListType;
    // 最大数量的文件，Infinity不限制
    maxNumber?: number;
    // 文件最大多少MB
    maxSize?: number;
    // 是否支持多选
    multiple?: boolean;
    // support xxx.xxx.xx
    // 返回的字段 默认url
    resultField?: 'fileName' | 'ossId' | 'url' | string;
    value?: string | string[];
  }>(),
  {
    value: () => [],
    disabled: false,
    listType: 'picture-card',
    helpText: '',
    maxSize: 2,
    maxNumber: 1,
    accept: () => defaultImageAccept,
    multiple: false,
    api: uploadApi,
    resultField: '',
  },
);
const emit = defineEmits(['change', 'update:value', 'delete']);
type ListType = 'picture' | 'picture-card' | 'text';
const { accept, helpText, maxNumber, maxSize } = toRefs(props);
const isInnerOperate = ref<boolean>(false);
const { getStringAccept } = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize,
});
const previewOpen = ref<boolean>(false);
const previewImage = ref<string>('');
const previewTitle = ref<string>('');

const fileList = ref<UploadProps['fileList']>([]);
const isLtMsg = ref<boolean>(true);
const isActMsg = ref<boolean>(true);
const isFirstRender = ref<boolean>(true);

watch(
  () => props.value,
  (v) => {
    if (isInnerOperate.value) {
      isInnerOperate.value = false;
      return;
    }
    let value: string | string[] = [];
    if (v) {
      const _fileList: string[] = [];
      if (isString(v)) {
        _fileList.push(v);
      }
      if (isArray(v)) {
        _fileList.push(...v);
      }
      // 直接赋值 可能为string | string[]
      value = v;
      fileList.value = _fileList.map((item, i) => {
        if (item && isString(item)) {
          return {
            uid: `${-i}`,
            name: item.slice(Math.max(0, item.lastIndexOf('/') + 1)),
            status: 'done',
            url: item,
          };
        } else if (item && isObject(item)) {
          return item;
        }
        return null;
      }) as UploadProps['fileList'];
    }
    if (!isFirstRender.value) {
      emit('change', value);
      isFirstRender.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function getBase64<T extends ArrayBuffer | null | string>(file: File) {
  return new Promise<T>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      resolve(reader.result as T);
    });
    reader.addEventListener('error', (error) => reject(error));
  });
}

const handlePreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64<string>(file.originFileObj!);
  }
  previewImage.value = file.url || file.preview || '';
  previewOpen.value = true;
  previewTitle.value =
    file.name ||
    previewImage.value.slice(
      Math.max(0, previewImage.value.lastIndexOf('/') + 1),
    );
};

const handleRemove = async (file: UploadFile) => {
  if (fileList.value) {
    const index = fileList.value.findIndex((item) => item.uid === file.uid);
    index !== -1 && fileList.value.splice(index, 1);
    const value = getValue();
    isInnerOperate.value = true;
    emit('update:value', value);
    emit('change', value);
    emit('delete', file);
  }
};

const handleCancel = () => {
  previewOpen.value = false;
  previewTitle.value = '';
};

const beforeUpload = async (file: File) => {
  const { maxSize, accept } = props;
  const isAct = await checkImageFileType(file, accept);
  if (!isAct) {
    message.error($t('component.upload.acceptUpload', [accept]));
    isActMsg.value = false;
    // 防止弹出多个错误提示
    setTimeout(() => (isActMsg.value = true), 1000);
  }
  const isLt = file.size / 1024 / 1024 > maxSize;
  if (isLt) {
    message.error($t('component.upload.maxSizeMultiple', [maxSize]));
    isLtMsg.value = false;
    // 防止弹出多个错误提示
    setTimeout(() => (isLtMsg.value = true), 1000);
  }
  return (isAct && !isLt) || Upload.LIST_IGNORE;
};

async function customRequest(info: UploadRequestOption<any>) {
  const { api } = props;
  if (!api || !isFunction(api)) {
    console.warn('upload api must exist and be a function');
    return;
  }
  try {
    const res = await api?.(info.file);
    /**
     * 由getValue处理 传对象过去
     * 直接传string(id)会被转为Number
     */
    info.onSuccess!(res);
    // 获取
    const value = getValue();
    isInnerOperate.value = true;
    emit('update:value', value);
    emit('change', value);
  } catch (error: any) {
    console.error(error);
    info.onError!(error);
  }
}

function getValue() {
  const list = (fileList.value || [])
    .filter((item) => item?.status === UploadResultStatus.DONE)
    .map((item: any) => {
      if (item?.response && props?.resultField) {
        return item?.response?.[props.resultField];
      }
      // 适用于已经有图片 回显的情况 会默认在init处理为{url: 'xx'}
      if (item?.url) {
        return item.url;
      }
      // 注意这里取的key为 url
      return item?.response?.url;
    });
  // 只有一张图片 默认绑定string而非string[]
  if (props.maxNumber === 1 && list.length === 1) {
    return list[0];
  }
  // 只有一张图片 && 删除图片时 可自行修改
  if (props.maxNumber === 1 && list.length === 0) {
    return '';
  }
  return list;
}
</script>

<template>
  <div>
    <Upload
      v-bind="$attrs"
      v-model:file-list="fileList"
      :accept="getStringAccept"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      :disabled="disabled"
      :list-type="listType"
      :max-count="maxNumber"
      :multiple="multiple"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div v-if="fileList && fileList.length < maxNumber">
        <PlusOutlined />
        <div style="margin-top: 8px">{{ $t('component.upload.upload') }}</div>
      </div>
    </Upload>
    <Modal
      :footer="null"
      :open="previewOpen"
      :title="previewTitle"
      @cancel="handleCancel"
    >
      <img :src="previewImage" alt="" style="width: 100%" />
    </Modal>
  </div>
</template>

<style lang="less">
.ant-upload-select-picture-card i {
  color: #999;
  font-size: 32px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
