<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    @register="registerInnerModal"
    @ok="handleSubmit"
    @cancel="resetForm"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { tagUpdate, tagAdd, tagInfo } from '@/api/member/tag';
  import { modalSchemas } from './tag.data';

  defineOptions({ name: 'TagModal' });

  const emit = defineEmits(['register', 'reload']);

  const isUpdate = ref<boolean>(false);

  const title = computed<string>(() => {
    return isUpdate.value ? '编辑参数' : '新增参数';
  });

  const [registerInnerModal, { modalLoading, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      modalLoading(true);
      const { record, update } = data;
      isUpdate.value = update;
      if (update && record) {
        const ret = await tagInfo(record.id);
        await setFieldsValue(ret);
      }
      modalLoading(false);
    },
  );

  const [registerForm, { setFieldsValue, resetForm, validate }] = useForm({
    baseColProps: {
      span: 24,
    },
    labelWidth: 80,
    name: 'tag_modal',
    showActionButtonGroup: false,
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      modalLoading(true);
      const data = await validate();
      if (unref(isUpdate)) {
        await tagUpdate(data);
      } else {
        await tagAdd(data);
      }
      emit('reload');
      closeModal();
      await resetForm();
    } catch (e) {
      console.log(e);
    } finally {
      modalLoading(false);
    }
  }
</script>

<style scoped></style>
