<script setup lang="ts">
import { useRouter } from "vue-router";
import noLogin from "@/assets/status/403.svg?component";

defineOptions({
  name: "notLogin"
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noLogin />
    <div class="ml-12">
      <p
        v-motion
        class="font-medium text-4xl mb-4 dark:text-white"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 80 } }"
      >
        当前页面需要登录
      </p>
      <el-button
        v-motion
        type="primary"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 160 } }"
        @click="router.push('/')"
      >
        返回首页
      </el-button>
      <el-button
        v-motion
        type="primary"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 240 } }"
        @click="
          router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath }
          })
        "
      >
        前往登录
      </el-button>
    </div>
  </div>
</template>
