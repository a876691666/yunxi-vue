import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { getDictOptions } from '@/utils/dict';
import { useRender } from '@/hooks/component/useRender';
export const formSchemas: FormSchema[] = [
  {
    label: '删除标志',
    field: 'delFlag',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioButtonGroup',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '模块标志',
    field: 'module',
    component: 'Input',
  },
  {
    label: '分组ID',
    field: 'id',
    component: 'Input',
  },
  {
    label: '分组显示名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '分组最大人数',
    field: 'max',
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
    title: '删除标志',
    dataIndex: 'delFlag',
  },
  {
    title: '状态',
    dataIndex: 'status',
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
    title: '分组ID',
    dataIndex: 'id',
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
    label: '删除标志',
    field: 'delFlag',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '状态',
    field: 'status',
    required: false,
    component: 'RadioButtonGroup',
    show: false,
  },
  {
    label: '备注',
    field: 'remark',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '模块标志',
    field: 'module',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '分组ID',
    field: 'id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '分组显示名',
    field: 'name',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '分组最大人数',
    field: 'max',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '创建者',
    field: 'createBy',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '创建时间',
    field: 'createTime',
    required: false,
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    show: false,
  },
  {
    label: '更新者',
    field: 'updateBy',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '更新时间',
    field: 'updateTime',
    required: false,
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    show: false,
  },
];
