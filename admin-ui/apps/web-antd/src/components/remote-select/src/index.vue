<template>
	<Select v-model:value="state.value" show-search style="width: 100%" :filter-option="false"
		:not-found-content="(state.fetching || !state.options?.length) ? undefined : null" :options="state.options"
		@search="fetchUser" @select="onSelect">
		<template #notFoundContent>
			<Spin size="small" v-if="state.fetching" />
			<span v-else>未找到数据</span>
		</template>
	</Select>
</template>
<script lang="ts" setup>
import { onMounted, onUpdated, reactive, watch } from 'vue';
import { debounce } from 'lodash-es';
import { Select, Spin } from 'ant-design-vue';

let lastFetchId = 0;

const props = withDefaults(defineProps<{
	modelValue?: any;
	onOptions?: (val: string) => Promise<any[]>;
}>(), {

	onOptions: undefined,
});

const emit = defineEmits<{
	change: [any];
	'update:value': [any];
}>();

const state = reactive({
	options: [] as any[],
	value: props.modelValue,
	fetching: false,
});

const fetchUser = debounce((value?: any) => {
	lastFetchId += 1;
	const fetchId = lastFetchId;
	state.options = [];
	state.fetching = true;
	props.onOptions?.(value).then((options: any[]) => {
		if (fetchId !== lastFetchId)
			return;

		state.options = options;
		state.fetching = false;
	});
}, 200);


onMounted(() => {
	fetchUser();
})

watch(() => props.modelValue, () => {
	onSelect(props.modelValue);
});

const onSelect = (value: any) => {
	state.value = value;
	emit('update:value', value);
	emit('change', value);
};
</script>