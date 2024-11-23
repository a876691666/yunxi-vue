import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';
import { RemoteSelect } from '#/components/remote-select';
import { markRaw } from 'vue';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '禁止状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '分组名',
    field: 'name',
  },
  {
    title: '模块', 
    field: 'module',
  },
  {
    title: '等级',
    field: 'level',
  },
  {
    title: '禁止状态',
    field: 'status',
    slots: { default: 'status' },
  },
  {
    title: '分组状态',
    field: 'groupDisabled',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
        return renderDict(row.status, 'sys_normal_disable');
      },
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: "用户ID",
    fieldName: 'userId',
    component: 'Input',
    componentProps: {
    },
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '分组',
    fieldName: 'groupId',
    rules: "selectRequired",
    component: markRaw(RemoteSelect),
  },
  {
    label: '等级',
    fieldName: 'level',
    component: 'InputNumber',
    rules: 'required',
  },
];

export const drawerSchema = modalSchema;