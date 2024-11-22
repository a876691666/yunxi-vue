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
  groupUserExport,
  groupUserList,
  groupUserRemove,
} from '#/api/member/group-user';
import type { GroupUserForm } from '#/api/member/group-user/model';
import { commonDownloadExcel } from '#/utils/file/download';

import groupUserModal from './group-user-modal.vue';
import groupUserDrawer from './group-user-drawer.vue';
import { columns, querySchema } from './data';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3',
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
        return await groupUserList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'userId',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'member-group-user-index'
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

const [GroupUserModal, modalApi] = useVbenModal({
  connectedComponent: groupUserModal,
});

// const [GroupUserDrawer, drawerApi] = useVbenDrawer({
//   connectedComponent: groupUserDrawer,
// });

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
  // drawerApi.setData({});
  // drawerApi.open();
}

async function handleEdit(row: Required<GroupUserForm>) {
  modalApi.setData({ id: row.userId });
  modalApi.open();
  // drawerApi.setData({ id: row.userId });
  // drawerApi.open();
}

async function handleDelete(row: Required<GroupUserForm>) {
  await groupUserRemove(row.userId);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<GroupUserForm>) => row.userId);
  // Drawer.confirm({
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await groupUserRemove(ids);
      await tableApi.query();
      checked.value = false;
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(groupUserExport, '用户分组映射表数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <div>
    <BasicTable table-title="用户分组映射表列表">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['member:group-user:export']" @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button :disabled="!checked" danger type="primary" v-access:code="['member:group-user:remove']"
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button type="primary" v-access:code="['member:group-user:add']" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button v-access:code="['member:group-user:edit']" @click.stop="handleEdit(row)">
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm :get-popup-container="getVxePopupContainer" placement="left" title="确认删除？"
            @confirm="handleDelete(row)">
            <ghost-button danger v-access:code="['member:group-user:remove']" @click.stop="">
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <GroupUserModal @reload="tableApi.query()" />
    <!-- <GroupUserDrawer @reload="tableApi.query()" /> -->
  </div>
</template>
