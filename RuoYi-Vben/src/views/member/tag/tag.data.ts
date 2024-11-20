import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { getDictOptions } from '@/utils/dict';
import { useRender } from '@/hooks/component/useRender';
export const formSchemas: FormSchema[] = [
  {
    label: '状态',
    field: 'status',
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions('sys_normal_disable')
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '标签显示名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '标签code',
    field: 'code',
    component: 'Input',
  },
  {
    label: '模块标志',
    field: 'module',
    component: 'Input',
  },
  {
    label: '创建者',
    field: 'createBy',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '更新者',
    field: 'updateBy',
    component: 'Input',
  },
  {
    label: '更新时间',
    field: 'updateTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
const { renderDict } = useRender();
export const columns: BasicColumn[] = [
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => renderDict(value, 'sys_normal_disable'),
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '标签显示名',
    dataIndex: 'name',
  },
  {
    title: '标签code',
    dataIndex: 'code',
  },
  {
    title: '模块标志',
    dataIndex: 'module',
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: '状态',
    field: 'status',
    required: false,
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions('sys_normal_disable')
    },
  },
  {
    label: '备注',
    field: 'remark',
    required: false,
    component: 'Input',
  },
  {
    label: '标签显示名',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '标签code',
    field: 'code',
    required: true,
    component: 'Input',
  },
  {
    label: '标签ID',
    field: 'id',
    required: false,
    component: 'InputNumber',
    show: false,
  },
  {
    label: '模块标志',
    field: 'module',
    required: true,
    component: 'Input',
  },
];
