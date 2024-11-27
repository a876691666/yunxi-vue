<script setup lang="ts">
import { type CSSProperties, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter } from "@/router/utils";

defineOptions({
  name: "PermissionPage"
});

const elStyle = computed((): CSSProperties => {
  return {
    width: "85vw",
    justifyContent: "start"
  };
});

const userStore = useUserStoreHook();

const options = [
  {
    value: JSON.stringify(userStore.tags),
    label: "当前"
  },
  {
    value: JSON.stringify(["permTags:test"]),
    label: "测试权限角色"
  }
];

function onChange(v: string) {
  userStore.SET_TAGS(JSON.parse(v));
  initRouter();
}
</script>

<template>
  <div>
    <p class="mb-2">
      模拟后台根据不同角色返回对应路由，观察左侧菜单变化（管理员角色可查看系统管理菜单、普通角色不可查看系统管理菜单）
      <br />
      查看 src/router/modules/permission.ts
      文件，可以看到测试权限角色对应的权限标签为
    </p>
    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">
          <span>当前角色：{{ userStore.tags }}</span>
        </div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/permission/page/index.vue"
          target="_blank"
        >
          代码位置 src/views/permission/page/index.vue
        </el-link>
      </template>
      <el-select
        :model-value="JSON.stringify(userStore.tags)"
        class="!w-[160px]"
        @change="onChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-card>
  </div>
</template>
