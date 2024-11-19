<script setup lang="ts">
import dayjs from "dayjs";
import { getMineLogs } from "@/api/user";
import { reactive, ref, onMounted, watch } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import type { PaginationProps } from "@pureadmin/table";

defineOptions({
  name: "SecurityLog"
});

const loading = ref(true);
const dataList = ref([]);
const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true,
  layout: "prev, pager, next"
});
const columns: TableColumnList = [
  {
    label: "详情",
    prop: "classMethodTitle",
    width: 140,
    formatter: ({ classMethodTitle }) => classMethodTitle.split(":")[1]
  },
  {
    label: "IP 地址",
    prop: "handleRemoteIp",
    width: "140px"
  },
  {
    label: "地点",
    prop: "handleUa",
    minWidth: 140
  },
  {
    label: "时间",
    prop: "createTime",
    width: 180,
    formatter: ({ createTime }) =>
      dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
  }
];

watch(pagination, onSearch, { deep: true });

async function onSearch() {
  loading.value = true;
  const data = await getMineLogs({
    pageSize: pagination.pageSize,
    pageNum: pagination.currentPage,
    orderByColumn: "create_time",
    isAsc: "descending"
  });
  dataList.value = data.list;
  pagination.total = data.total;

  loading.value = false;
}

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">安全日志</h3>
    <pure-table
      row-key="id"
      table-layout="auto"
      :loading="loading"
      :data="dataList"
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</template>
