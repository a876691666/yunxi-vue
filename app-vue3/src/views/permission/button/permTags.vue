<script setup lang="ts">
import { hasTag } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";

const { tags } = useUserStoreHook();

defineOptions({
  name: "PermissionButtonLogin"
});
</script>

<template>
  <div>
    <p class="mb-2">当前拥有的标签列表：{{ tags }}</p>

    <el-card shadow="never" class="mb-2">
      <template #header>
        <div class="card-header">组件方式判断权限</div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/permission/button/perms.vue"
          target="_blank"
        >
          代码位置 src/views/permission/button/perms.vue
        </el-link>
      </template>
      <el-space wrap>
        <PermTags value="member:member-manager">
          <el-button plain type="warning">
            拥有标签：'member:member-manager' 权限可见
          </el-button>
        </PermTags>
        <PermTags :value="['member:member-manager', 'member:avatar-upload']">
          <el-button plain type="warning">
            同时拥有标签：['member:member-manager', 'member:avatar-upload']
            权限可见
          </el-button>
        </PermTags>
      </el-space>
    </el-card>

    <el-card shadow="never" class="mb-2">
      <template #header>
        <div class="card-header">函数方式判断权限</div>
      </template>
      <el-space wrap>
        <el-button v-if="hasTag('member:member-manager')" plain type="warning">
          拥有标签：'member:member-manager' 权限可见
        </el-button>
        <el-button
          v-if="hasTag(['member:member-manager', 'member:avatar-upload'])"
          plain
          type="warning"
        >
          同时拥有标签：['member:member-manager', 'member:avatar-upload']
          权限可见
        </el-button>
      </el-space>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          指令方式判断权限（该方式不能动态修改权限）
        </div>
      </template>
      <el-space wrap>
        <el-button v-perm-tags="'member:member-manager'" plain type="warning">
          拥有标签：'member:member-manager' 权限可见
        </el-button>
        <el-button v-perm-tags="['member:member-manager']" plain type="warning">
          拥有标签：['member:member-manager'] 权限可见
        </el-button>
        <el-button
          v-perm-tags="['member:member-manager', 'member:avatar-upload']"
          plain
          type="warning"
        >
          同时拥有标签：['member:member-manager', 'member:avatar-upload']
          权限可见
        </el-button>
      </el-space>
    </el-card>
  </div>
</template>
