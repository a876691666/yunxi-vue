<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { computed, ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, type VbenFormProps } from '@vben/common-ui';
import { Fallback } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  tableCheckboxEvent,
  useVbenVxeGrid,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import {
  packageChangeStatus,
  packageExport,
  packageList,
  packageRemove,
} from '#/api/system/tenant-package';
import { TableSwitch } from '#/components/table';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';
import tenantPackageDrawer from './tenant-package-drawer.vue';

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
        // 区间选择器处理
        if (formValues?.createTime) {
          formValues.params = {
            beginTime: dayjs(formValues.createTime[0]).format(
              'YYYY-MM-DD 00:00:00',
            ),
            endTime: dayjs(formValues.createTime[1]).format(
              'YYYY-MM-DD 23:59:59',
            ),
          };
          Reflect.deleteProperty(formValues, 'createTime');
        } else {
          Reflect.deleteProperty(formValues, 'params');
        }

        return await packageList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    isHover: true,
    keyField: 'packageId',
  },
  id: 'system-tenant-package-index',
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

const [TenantPackageDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: tenantPackageDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: Recordable<any>) {
  drawerApi.setData({ id: record.packageId });
  drawerApi.open();
}

async function handleDelete(row: Recordable<any>) {
  await packageRemove(row.packageId);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: any) => row.packageId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await packageRemove(ids);
      await tableApi.query();
      checked.value = false;
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    packageExport,
    '租户套餐数据',
    tableApi.formApi.form.values,
  );
}

/**
 * 与后台逻辑相同
 * 只有超级管理员能访问租户相关
 */
const { hasAccessByCodes, hasAccessByRoles } = useAccess();

const isSuperAdmin = computed(() => {
  return hasAccessByRoles(['superadmin']);
});
</script>

<template>
  <Page v-if="isSuperAdmin" :auto-content-height="true">
    <BasicTable table-title="租户套餐列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['system:tenantPackage:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!checked"
            danger
            type="primary"
            v-access:code="['system:tenantPackage:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['system:tenantPackage:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #status="{ row }">
        <TableSwitch
          v-model="row.status"
          :api="() => packageChangeStatus(row)"
          :disabled="!hasAccessByCodes(['system:tenantPackage:edit'])"
          :reload="() => tableApi.query()"
        />
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['system:tenantPackage:edit']"
            @click="handleEdit(row)"
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
              v-access:code="['system:tenantPackage:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <TenantPackageDrawer @reload="tableApi.query()" />
  </Page>
  <Fallback v-else description="您没有租户的访问权限" status="403" />
</template>
