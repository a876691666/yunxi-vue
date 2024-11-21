<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import {
  Image,
  message,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Tooltip,
} from 'ant-design-vue';
import { isEmpty } from 'lodash-es';

import {
  tableCheckboxEvent,
  useVbenVxeGrid,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { configInfoByKey } from '#/api/system/config';
import { ossDownload, ossList, ossRemove } from '#/api/system/oss';
import { downloadByData } from '#/utils/file/download';

import { columns, querySchema } from './data';
import fileUploadModal from './file-upload-modal.vue';
import imageUploadModal from './image-upload-modal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 日期选择格式化
  fieldMappingTime: [
    [
      'createTime',
      ['params[beginCreateTime]', 'params[endCreateTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }, formValues = {}) => {
        const params: any = {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        };
        if (!isEmpty(sort)) {
          params.orderByColumn = sort.field;
          params.isAsc = sort.order;
        }
        return await ossList(params);
      },
    },
  },
  rowConfig: {
    isHover: true,
    keyField: 'ossId',
    height: 65,
  },
  sortConfig: {
    remote: true,
  },
  id: 'system-oss-index',
};

const checked = ref(false);
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    sortChange: () => {
      tableApi.query();
    },
    checkboxChange: tableCheckboxEvent(checked),
    checkboxAll: tableCheckboxEvent(checked),
  },
});

async function handleDownload(row: Recordable<any>) {
  const hideLoading = message.loading($t('pages.common.downloadLoading'), 0);
  try {
    const data = await ossDownload(row.ossId);
    downloadByData(data, row.originalName);
  } finally {
    hideLoading();
  }
}

async function handleDelete(row: Recordable<any>) {
  await ossRemove(row.ossId);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: any) => row.ossId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await ossRemove(ids);
      await tableApi.query();
    },
  });
}

const router = useRouter();
function handleToSettings() {
  router.push('/system/oss-config');
}

const preview = ref(false);
onMounted(async () => {
  const resp = await configInfoByKey('sys.oss.previewListResource');
  preview.value = Boolean(resp);
});

function isImageFile(ext: string) {
  const supportList = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  return supportList.some((item) => ext.toLocaleLowerCase().includes(item));
}
const [ImageUploadModal, imageUploadApi] = useVbenModal({
  connectedComponent: imageUploadModal,
});

const [FileUploadModal, fileUploadApi] = useVbenModal({
  connectedComponent: fileUploadModal,
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="文件列表">
      <template #toolbar-tools>
        <Space>
          <Tooltip title="预览图片">
            <Switch v-model:checked="preview" />
          </Tooltip>
          <a-button
            v-access:code="['system:ossConfig:list']"
            @click="handleToSettings"
          >
            配置管理
          </a-button>
          <a-button
            :disabled="!checked"
            danger
            type="primary"
            v-access:code="['system:oss:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            v-access:code="['system:oss:upload']"
            @click="fileUploadApi.open"
          >
            文件上传
          </a-button>
          <a-button
            v-access:code="['system:oss:upload']"
            @click="imageUploadApi.open"
          >
            图片上传
          </a-button>
        </Space>
      </template>
      <template #url="{ row }">
        <Image
          v-if="preview && isImageFile(row.url)"
          :src="row.url"
          height="50px"
        />
        <span v-else>{{ row.url }}</span>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['system:oss:download']"
            @click="handleDownload(row)"
          >
            {{ $t('pages.common.download') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['system:oss:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <ImageUploadModal @reload="tableApi.query" />
    <FileUploadModal @reload="tableApi.query" />
  </Page>
</template>
