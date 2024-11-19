<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          @click="downloadExcel(groupExport, '用户分组表数据', getForm().getFieldsValue())"
          v-auth="'${permissionPrefix}:export'"
          >导出</a-button
        >
        <a-button
          type="primary"
          danger
          @click="multipleRemove(groupRemove)"
          :disabled="!selected"
          v-auth="'${permissionPrefix}:remove'"
          >删除</a-button
        >
        <a-button
          type="primary"
          @click="handleAdd"
          v-auth="'${permissionPrefix}:add'"
          >新增</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: '${permissionPrefix}:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: '${permissionPrefix}:remove',
                popConfirm: {
                  placement: 'left',
                  title: '是否删除用户分组表[' + record.id + ']?',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <groupModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { groupList, groupExport, groupRemove } from '@/api/member/group';
  import { downloadExcel } from '@/utils/file/download';
  import { useModal } from '@/components/Modal';
  import groupModal from './groupModal.vue';
  import { formSchemas, columns } from './group.data';
  import { IconEnum } from '@/enums/appEnum';

  defineOptions({ name: 'group' });

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: '用户分组表列表',
    api: groupList,
    showIndexColumn: false,
    rowKey: 'id',
    useSearchForm: true,
    formConfig: {
      schemas: formSchemas,
      baseColProps: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 6,
      },
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

  function handleEdit(record: Recordable) {
    openModal(true, { record, update: true });
  }

  function handleAdd() {
    openModal(true, { update: false });
  }

  async function handleDelete(record: Recordable) {
    await groupRemove([record.id]);
    await reload();
  }
</script>

<style scoped></style>
