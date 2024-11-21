<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { Page, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { forceLogout, onlineList } from '#/api/monitor/online';

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
};

const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await onlineList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    isHover: true,
    keyField: 'tokenId',
  },
  id: 'monitor-online-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

async function handleForceOffline(row: Recordable<any>) {
  await forceLogout(row.tokenId);
  await tableApi.query();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="在线用户列表">
      <template #action="{ row }">
        <Popconfirm
          :get-popup-container="getVxePopupContainer"
          :title="`确认强制下线[${row.userName}]?`"
          placement="left"
          @confirm="handleForceOffline(row)"
        >
          <ghost-button danger>强制下线</ghost-button>
        </Popconfirm>
      </template>
    </BasicTable>
  </Page>
</template>
