<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui';

interface Props {
  class?: any;
  // 弹出层的类名
  contentClass?: any;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}

const props = defineProps<Props>();
</script>
<template>
  <Select>
    <SelectTrigger :class="props.class">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent :class="props.contentClass">
      <template v-for="item in options" :key="item.value">
        <SelectItem :value="item.value"> {{ item.label }} </SelectItem>
      </template>
    </SelectContent>
  </Select>
</template>
