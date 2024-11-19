import { BasicColumn } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { FormSchema } from '@/components/Form';
import { getDictOptions } from '@/utils/dict';
import { DictEnum } from '@/enums/dictEnum';

export const { renderDict } = useRender();
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
  },
  {
    dataIndex: 'avatar',
    title: '头像',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phonenumber',
  },
  {
    title: '用户状态',
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
    field: 'userId',
    label: '主键ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'nickName',
    label: '昵称',
    required: true,
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
  },
  {
    field: 'phonenumber',
    label: '手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const resetPasswordSchemas: FormSchema[] = [
  {
    field: 'userId',
    component: 'Input',
    label: '用户ID',
    defaultValue: -1,
    required: true,
    show: false,
  },
  {
    field: 'password',
    component: 'StrengthMeter',
    label: '新的密码',
    componentProps: {
      placeholder: '请输入新的密码, 密码长度为5 - 20',
    },
    rules: [{ required: true, min: 5, max: 20, message: '密码长度为5 - 20' }],
  },
];
