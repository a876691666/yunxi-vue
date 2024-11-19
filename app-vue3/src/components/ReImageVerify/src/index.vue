<script setup lang="ts">
import { watch } from "vue";
import { useImageVerify } from "./hooks";

defineOptions({
  name: "ReImageVerify"
});

interface Props {
  code?: string;
}

interface Emits {
  (e: "update:code", code: string): void;
}

withDefaults(defineProps<Props>(), {
  code: ""
});

const emit = defineEmits<Emits>();

const { domRef, uuid, imgCode, getImgCode } = useImageVerify();

watch(uuid, newValue => {
  emit("update:code", newValue);
});

defineExpose({ getImgCode });
</script>

<template>
  <img
    ref="domRef"
    :src="imgCode"
    width="120"
    height="40"
    class="cursor-pointer"
    @click="getImgCode"
  />
</template>
