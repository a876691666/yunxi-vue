<script setup lang="ts">
import { Page } from '@vben/common-ui';
import GroupUser from './group-user/index.vue';
import TagUser from './tag-user/index.vue';
</script>
<template>
	<Page :auto-content-height="true">
		<div class="flex flex-col lg:flex-row gap-4 h-full">
			<GroupUser class="flex-1 overflow-hidden" />
			<TagUser class="flex-1 overflow-hidden" />
		</div>
	</Page>
</template>