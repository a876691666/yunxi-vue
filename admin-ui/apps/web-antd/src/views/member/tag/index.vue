<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { ref } from 'vue';

import { Page, useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Drawer, Popconfirm, Space } from 'ant-design-vue';
import dayjs from 'dayjs';

import {   
  tableCheckboxEvent,
  useVbenVxeGrid, 
  type VxeGridProps 
} from '#/adapter/vxe-table';

import {
  tagExport,
  tagList,
  tagRemove,
} from '#/api/member/tag';
import type { TagForm } from '#/api/member/tag/model';
import { commonDownloadExcel } from '#/utils/file/download';

import tagModal from './tag-modal.vue';
import tagDrawer from './tag-drawer.vue';
import { columns, querySchema } from './data';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 处理区间选择器RangePicker时间格式 将一个字段映射为两个字段 搜索/导出会用到
  // 不需要直接删除
  // fieldMappingTime: [
  //  [
  //    'createTime',
  //    ['params[beginTime]', 'params[endTime]'],
  //    ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
  //  ],
  // ],
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
      query: async ({ page }, formValues = {}) => {
        return await tagList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'member-tag-index'
};

const checked = ref(false);
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    checkboxChange: tableCheckboxEvent(checked),
    checkboxAll: tableCheckboxEvent(checked),
  }
});

const [TagModal, modalApi] = useVbenModal({
  connectedComponent: tagModal,
});

// const [TagDrawer, drawerApi] = useVbenDrawer({
//   connectedComponent: tagDrawer,
// });

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
  // drawerApi.setData({});
  // drawerApi.open();
}

async function handleEdit(row: Required<TagForm>) {
  modalApi.setData({ id: row.id });
  modalApi.open();
  // drawerApi.setData({ id: row.id });
  // drawerApi.open();
}

async function handleDelete(row: Required<TagForm>) {
  await tagRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<TagForm>) => row.id);
  // Drawer.confirm({
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await tagRemove(ids);
      await tableApi.query();
      checked.value = false;
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(tagExport, '用户标签表数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="用户标签表列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['member:tag:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!checked"
            danger
            type="primary" 
            v-access:code="['member:tag:remove']" 
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['member:tag:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['member:tag:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['member:tag:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <TagModal @reload="tableApi.query()" />
    <!-- <TagDrawer @reload="tableApi.query()" /> -->
  </Page>
</template>
