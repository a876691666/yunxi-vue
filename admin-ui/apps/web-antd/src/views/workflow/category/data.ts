import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    fieldName: 'categoryName',
    label: '分类名称',
    component: 'Input',
  },
  {
    fieldName: 'categoryCode',
    label: '分类编码',
    component: 'Input',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    field: 'categoryName',
    title: '分类名称',
    treeNode: true,
  },
  {
    field: 'categoryCode',
    title: '分类编码',
  },
  {
    field: 'sortNum',
    title: '排序',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 200,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: 'id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    fieldName: 'parentId',
    label: '父级分类',
    rules: 'required',
    defaultValue: 0,
    component: 'TreeSelect',
  },
  {
    fieldName: 'categoryName',
    label: '分类名称',
    component: 'Input',
    rules: 'required',
  },
  {
    fieldName: 'categoryCode',
    label: '分类编码',
    component: 'Input',
    rules: 'required',
  },
  {
    fieldName: 'sortNum',
    label: '排序',
    component: 'InputNumber',
    rules: 'required',
  },
];
