<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { tagUserAdd } from '#/api/member/tag-user';

import { modalSchema } from './data';
import { tagOptions } from '#/api/member/tag';
import { ref } from 'vue';

const emit = defineEmits<{ reload: [] }>();

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    // 默认占满两列
    formItemClass: 'col-span-2',
    // 默认label宽度 px
    labelWidth: 80,
    // 通用配置项 会影响到所有表单项
    componentProps: {
      class: 'w-full',
    }
  },
  schema: modalSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

/**
 * 初始化部门选择
 */
async function setupTagSelect() {
  formApi.updateSchema([
    {
      componentProps: () => ({
        class: 'w-full',
        fieldNames: {
          label: 'name',
          value: 'id',
          children: 'children',
        },
        onOptions: async (value: string) => {
          return (await tagOptions(value)).filter((item) => !existTagIds.value.includes(item.id));
        },
        getPopupContainer,
        placeholder: '请选择',
      }),
      fieldName: 'tagId',
    },
  ]);
}

const existTagIds = ref<string[]>([]);

const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);
    await setupTagSelect();
    const modalData = modalApi.getData();
    existTagIds.value = modalData.existTagIds;
    formApi.setValues({ userId: modalData.userId });
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.modalLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await tagUserAdd(data);
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.modalLoading(false);
  }
}

async function handleCancel() {
  modalApi.close();
  await formApi.resetForm();
}
</script>

<template>
  <BasicModal :close-on-click-modal="false" title="为用户添加标签" class="w-[550px]">
    <BasicForm />
  </BasicModal>
</template>
