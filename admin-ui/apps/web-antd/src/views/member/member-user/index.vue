<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { ref } from 'vue';

import { Page, useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Drawer, Popconfirm, Space, Avatar } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  tableCheckboxEvent,
  useVbenVxeGrid,
  type VxeGridProps
} from '#/adapter/vxe-table';

import {
  memberUserExport,
  memberUserList,
  memberUserRemove,
} from '#/api/member/member-user';
import type { MemberUserForm } from '#/api/member/member-user/model';
import { commonDownloadExcel } from '#/utils/file/download';

import memberUserModal from './member-user-modal.vue';
import { columns, querySchema } from './data';
import { preferences } from '@vben/preferences';
import { useRouter } from 'vue-router';

const router = useRouter()

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 120,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3',
  // 处理区间选择器RangePicker时间格式 将一个字段映射为两个字段 搜索/导出会用到
};

const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await memberUserList({
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
  id: 'member-member-user-index'
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

const [MemberUserModal, modalApi] = useVbenModal({
  connectedComponent: memberUserModal,
});

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
}

async function handleEdit(row: Required<MemberUserForm>) {
  modalApi.setData({ id: row.userId });
  modalApi.open();
}

function handleDetail(row: Required<MemberUserForm>) {
  router.push(`/member/member-user-detail/${row.userId}`);
}

async function handleDelete(row: Required<MemberUserForm>) {
  await memberUserRemove(row.userId);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<MemberUserForm>) => row.userId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await memberUserRemove(ids);
      await tableApi.query();
      checked.value = false;
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(memberUserExport, 'App 用户信息表数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="App 用户信息表列表">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['member:member-user:export']" @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button :disabled="!checked" danger type="primary" v-access:code="['member:member-user:remove']"
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button type="primary" v-access:code="['member:member-user:add']" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #avatar="{ row }">
        <!-- 可能要判断空字符串情况 所以没有使用?? -->
        <Avatar :src="row.avatar || preferences.app.defaultAvatar" />
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button v-access:code="['member:member-user:edit']" @click.stop="handleEdit(row)">
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <ghost-button v-access:code="['member:member-user:detail']" @click.stop="handleDetail(row)">
            {{ $t('pages.common.info') }}
          </ghost-button>
          <Popconfirm :get-popup-container="getVxePopupContainer" placement="left" title="确认删除？"
            @confirm="handleDelete(row)">
            <ghost-button danger v-access:code="['member:member-user:remove']" @click.stop="">
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <MemberUserModal @reload="tableApi.query()" />
  </Page>
</template>
