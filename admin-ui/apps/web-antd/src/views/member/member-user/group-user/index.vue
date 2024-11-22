<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

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
import { columns, querySchema } from './data';

import TableSwitch from '#/components/table/src/table-switch.vue';
import { useRoute } from 'vue-router';

const routes = useRoute();
// 获取路由参数
const userId = routes.params.userId as string;

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3',
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
          userId,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'groupId',
  },
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

function handleAdd() {
  modalApi.setData({
    userId: userId,
    existGroupIds: tableApi.grid.getTableData().fullData.map(
      (row: Required<GroupUserForm>) => row.groupId
    )
  });
  modalApi.open();
}

async function handleDelete(row: Required<GroupUserForm>) {
  await groupUserRemove(userId, row.groupId);
  await tableApi.query();
}

function handleMultiDelete() {
  // const rows = tableApi.grid.getCheckboxRecords();
  // const ids = rows.map((row: Required<GroupUserForm>) => row.groupId);
  // Modal.confirm({
  //   title: '提示',
  //   okType: 'danger',
  //   content: `确认删除选中的${ids.length}条记录吗？`,
  //   onOk: async () => {
  //     await groupUserRemove(userId, ids);
  //     await tableApi.query();
  //     checked.value = false;
  //   },
  // });
}

function handleDownloadExcel() {
  commonDownloadExcel(groupUserExport, '用户分组映射表数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <div>
    <BasicTable table-title="用户分组映射表列表" id="member-group-user">
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
      <template #status="{ row }">
        <TableSwitch v-model="row.status" :reload="() => tableApi.query()" />
      </template>
      <template #action="{ row }">
        <Space>
          <Popconfirm :get-popup-container="(node) => getVxePopupContainer(node, 'member-group-user')" placement="left"
            title="确认去掉分组？" @confirm="handleDelete(row)">
            <a-button danger v-access:code="['member:group-user:remove']" @click.stop="" size="small">
              去掉分组
            </a-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <GroupUserModal @reload="tableApi.query()" />
  </div>
</template>
