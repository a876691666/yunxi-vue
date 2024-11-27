<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Popconfirm, Space } from 'ant-design-vue';

import {
  tableCheckboxEvent,
  useVbenVxeGrid,
  type VxeGridProps
} from '#/adapter/vxe-table';

import {
  tagUserExport,
  tagUserList,
  tagUserRemove,
  tagUserChangeStatus,
} from '#/api/member/tag-user';
import type { TagUserForm } from '#/api/member/tag-user/model';
import { commonDownloadExcel } from '#/utils/file/download';

import tagUserModal from './tag-user-modal.vue';
import { columns, querySchema } from './data';

import { useRoute } from 'vue-router';
import TableSwitch from '#/components/table/src/table-switch.vue';

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
        return await tagUserList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          userId,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'tagId',
  },
  id: 'member-tag-user-index'
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

const [TagUserModal, modalApi] = useVbenModal({
  connectedComponent: tagUserModal,
});

function handleAdd() {
  modalApi.setData({
    userId: userId, existTagIds: tableApi.grid.getTableData().fullData.map((row: Required<TagUserForm>) => row.tagId)
  });
  modalApi.open();
}

async function handleDelete(row: Required<TagUserForm>) {
  await tagUserRemove(userId, row.tagId);
  await tableApi.query();
}

function handleMultiDelete() {
  // const rows = tableApi.grid.getCheckboxRecords();
  // const ids = rows.map((row: Required<TagUserForm>) => row.userId);
  // // Drawer.confirm({
  // Modal.confirm({
  //   title: '提示',
  //   okType: 'danger',
  //   content: `确认删除选中的${ids.length}条记录吗？`,
  //   onOk: async () => {
  //     await tagUserRemove(ids);
  //     await tableApi.query();
  //     checked.value = false;
  //   },
  // });
}

function handleDownloadExcel() {
  commonDownloadExcel(tagUserExport, '用户标签映射表数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <div>
    <BasicTable table-title="用户标签映射表列表" id="member-tag-user">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['member:tag-user:export']" @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button :disabled="!checked" danger type="primary" v-access:code="['member:tag-user:remove']"
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button type="primary" v-access:code="['member:tag-user:add']" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #status="{ row }">
        <TableSwitch v-model="row.status" :api="() => tagUserChangeStatus({
          userId,
          tagId: row.tagId,
          status: row.status,
        })" :reload="() => tableApi.query()" />
      </template>
      <template #action="{ row }">
        <Space>
          <Popconfirm :get-popup-container="(node) => getVxePopupContainer(node, 'member-tag-user')" placement="left"
            title="确认去掉标签？" @confirm="handleDelete(row)">
            <a-button type="primary" danger v-access:code="['member:tag-user:remove']" @click.stop="" size="small">
              去掉标签
            </a-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <TagUserModal @reload="tableApi.query()" />
  </div>
</template>
