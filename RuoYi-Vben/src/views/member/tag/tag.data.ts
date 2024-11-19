import { BasicColumn } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { FormSchema } from '@/components/Form';
import { getDictOptions } from '@/utils/dict';
import { DictEnum } from '@/enums/dictEnum';

export const { renderDict } = useRender();
export const columns: BasicColumn[] = [
  {
    title: '标签显示名',
    dataIndex: 'name',
  },
  {
    title: '标签code',
    dataIndex: 'code',
  },
  {
    title: '模块',
    dataIndex: 'module',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

export const formSchemas: FormSchema[] = [
  {
    label: '用户名',
    field: 'userName',
    component: 'Input',
  },
  {
    label: '昵称',
    field: 'nickName',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'phonenumber',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.NORMAL_DISABLE),
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
  },
];

export const modalSchemas: FormSchema[] = [
  {
    field: 'id',
    label: '主键ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '标签显示名',
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: '标签code',
    component: 'Input',
    required: true,
  },
  {
    field: 'module',
    label: '模块',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
