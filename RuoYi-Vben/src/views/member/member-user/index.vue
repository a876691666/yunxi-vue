<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Space>
          <a-button @click="handleRefresh" v-auth="'member:member-user:query'">刷新缓存</a-button>
          <a-button
            class="<sm:hidden"
            v-auth="'member:member-user:export'"
            @click="downloadExcel(memberUserExport, '参数数据', getForm().getFieldsValue())"
            >导出</a-button
          >
          <a-button
            class="<sm:hidden"
            type="primary"
            danger
            @click="multipleRemove(memberUserRemove)"
            :disabled="!selected"
            v-auth="'member:member-user:remove'"
            >删除</a-button
          >
          <a-button type="primary" @click="handleAdd" v-auth="'member:member-user:add'"
            >新增</a-button
          >
        </Space>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <avatar v-if="record.avatar" :src="apiUrl + record.avatar" />
          <avatar
            v-else
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: 'member:member-user:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: 'member:member-user:remove',
                popConfirm: {
                  placement: 'left',
                  title: `是否删除[${record.configName}]?`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
            :dropDownActions="[
              {
                label: '重置密码',
                icon: IconEnum.RESET_PWD,
                auth: 'system:user:resetPwd',
                onClick: handleResetPassword.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.dataIndex === 'status'">
          <TableSwitch
            v-model="record.status"
            :disabled="!hasPermission('member:member-user:edit')"
            :api="() => ({})"
            :reload="reload"
          />
        </template>
      </template>
    </BasicTable>
    <MemberUserModal @register="registerModal" @reload="reload" />
    <UserResetPwdModal @register="registerPwdModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Space } from 'ant-design-vue';
  import {
    memberUserList,
    memberUserExport,
    memberUserRefreshCache,
    memberUserRemove,
  } from '@/api/member/member-user';
  import MemberUserModal from './MemberUserModal.vue';
  import { useModal } from '@/components/Modal';
  import { downloadExcel } from '@/utils/file/download';
  import { formSchemas, columns } from './member-user.data';
  import { IconEnum } from '@/enums/appEnum';
  import { usePermission } from '@/hooks/web/usePermission';
  import TableSwitch from '@/components/Table/src/components/TableSwitch.vue';
  import { useGlobSetting } from '@/hooks/setting';
  import UserResetPwdModal from './UserResetPwdModal.vue';

  const { hasPermission } = usePermission();
  const { apiUrl } = useGlobSetting();

  defineOptions({ name: 'MemberUser' });

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: '用户列表',
    showIndexColumn: false,
    api: memberUserList,
    rowKey: 'userId',
    useSearchForm: true,
    formConfig: {
      schemas: formSchemas,
      labelWidth: 80,
      name: 'member-user',
      baseColProps: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 6,
      },
      // 日期选择格式化
      fieldMapToTime: [
        [
          'createTime',
          ['params[beginTime]', 'params[endTime]'],
          ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
        ],
      ],
    },
    columns: columns,
    actionColumn: {
      width: 200,
      title: '操作',
      key: 'action',
      fixed: 'right',
    },
  });

  const [registerModal, { openModal }] = useModal();
  const [registerPwdModal, { openModal: openPwdModal }] = useModal();

  function handleResetPassword(record: Recordable) {
    openPwdModal(true, record);
  }

  async function handleRefresh() {
    await memberUserRefreshCache();
    await reload();
  }

  function handleEdit(record: Recordable) {
    openModal(true, { record, update: true });
  }

  function handleAdd() {
    openModal(true, { update: false });
  }

  async function handleDelete(record: Recordable) {
    await memberUserRemove([record.configId]);
    await reload();
  }
</script>

<style scoped></style>
