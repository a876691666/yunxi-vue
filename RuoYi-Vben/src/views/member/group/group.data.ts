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
    label: '分组ID',
    field: 'id',
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
    title: '模块标志',
    dataIndex: 'module',
  },
  {
    title: '分组显示名',
    dataIndex: 'name',
  },
  {
    title: '分组最大人数',
    dataIndex: 'max',
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: '备注',
    field: 'remark',
    required: false,
    component: 'Input',
  },
  {
    label: '模块标志',
    field: 'module',
    required: true,
    component: 'Input',
  },
  {
    label: '分组显示名',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '分组最大人数',
    field: 'max',
    required: true,
    component: 'InputNumber',
  },
];
