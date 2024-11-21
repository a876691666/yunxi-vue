<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenDrawer, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import {
  tableCheckboxEvent,
  useVbenVxeGrid,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import {
  roleAllocatedList,
  roleAuthCancel,
  roleAuthCancelAll,
} from '#/api/system/role';

import { columns, querySchema } from './data';
import roleAssignDrawer from './role-assign-drawer.vue';

const route = useRoute();
const roleId = route.params.roleId as string;

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
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
        return await roleAllocatedList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          roleId,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    isHover: true,
    keyField: 'userId',
  },
  id: 'system-role-assign-index',
};

const checked = ref(false);
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    checkboxChange: tableCheckboxEvent(checked),
    checkboxAll: tableCheckboxEvent(checked),
  },
});

const [RoleAssignDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: roleAssignDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

/**
 * 取消授权 一条记录
 */
async function handleAuthCancel(record: Recordable<any>) {
  await roleAuthCancel({ userId: record.userId, roleId });
  await tableApi.query();
}

/**
 * 批量取消授权
 */
function handleMultipleAuthCancel() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: any) => row.userId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认取消选中的${ids.length}条授权记录吗？`,
    onOk: async () => {
      await roleAuthCancelAll(roleId, ids);
      await tableApi.query();
      checked.value = false;
      tableApi.grid.clearCheckboxRow();
    },
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="已分配的用户列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!checked"
            danger
            type="primary"
            v-access:code="['system:role:remove']"
            @click="handleMultipleAuthCancel"
          >
            取消授权
          </a-button>
          <a-button
            type="primary"
            v-access:code="['system:role:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Popconfirm
          :get-popup-container="getVxePopupContainer"
          :title="`是否取消授权用户[${row.userName} - ${row.nickName}]?`"
          placement="left"
          @confirm="handleAuthCancel(row)"
        >
          <ghost-button
            danger
            v-access:code="['system:role:remove']"
            @click.stop=""
          >
            取消授权
          </ghost-button>
        </Popconfirm>
      </template>
    </BasicTable>
    <RoleAssignDrawer @reload="tableApi.query()" />
  </Page>
</template>
