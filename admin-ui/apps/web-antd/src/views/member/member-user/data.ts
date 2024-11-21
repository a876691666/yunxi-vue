import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userName',
    label: '用户账号',
  },
  {
    component: 'Input',
    fieldName: 'nickName',
    label: '用户昵称',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
  },
  {
    component: 'Input',
    fieldName: 'phonenumber',
    label: '手机号码',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
      options: getDictOptions('sys_user_sex'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'sex',
    label: '性别',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'Input',
    fieldName: 'loginIp',
    label: '最后登录IP',
  },
  {
    component: 'Input',
    fieldName: 'createBy',
    label: '创建者',
  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'createTime',
    label: '创建时间',
  },
  {
    component: 'Input',
    fieldName: 'updateBy',
    label: '更新者',
  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'updateTime',
    label: '更新时间',
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
  },
  {
    component: 'Input',
    fieldName: 'avatar',
    label: '头像地址',
  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'loginDate',
    label: '最后登录时间',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '用户账号',
    field: 'userName',
  },
  {
    title: '用户昵称',
    field: 'nickName',
  },
  {
    title: '邮箱',
    field: 'email',
  },
  {
    title: '手机号码',
    field: 'phonenumber',
  },
  {
    title: '性别',
    field: 'sex',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
        return renderDict(row.sex, 'sys_user_sex');
      },
    },
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
        return renderDict(row.status, 'sys_normal_disable');
      },
    },
  },
  {
    title: '最后登录IP',
    field: 'loginIp',
  },
  {
    title: '创建者',
    field: 'createBy',
  },
  {
    title: '创建时间',
    field: 'createTime',
  },
  {
    title: '更新者',
    field: 'updateBy',
  },
  {
    title: '更新时间',
    field: 'updateTime',
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    title: '头像地址',
    field: 'avatar',
  },
  {
    title: '最后登录时间',
    field: 'loginDate',
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
    label: '用户账号',
    fieldName: 'userName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '用户昵称',
    fieldName: 'nickName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '邮箱',
    fieldName: 'email',
    component: 'Input',
  },
  {
    label: '手机号码',
    fieldName: 'phonenumber',
    component: 'Input',
  },
  {
    label: '性别',
    fieldName: 'sex',
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
      options: getDictOptions('sys_user_sex'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '用户ID',
    fieldName: 'userId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '头像地址',
    fieldName: 'avatar',
    component: 'ImageUpload',
    componentProps: {
      // accept: ['jpg'], // 不支持type/*的写法 支持拓展名(不带.) 文件头(image/png这种)
      // maxNumber: 1, // 最大上传文件数 默认为1 为1会绑定为string而非string[]类型
      // resultField: 'url', // 上传成功后返回的字段名 默认url 可选['ossId', 'url', 'fileName']
    },
  },
];

export const drawerSchema = modalSchema;