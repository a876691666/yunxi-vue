<template>
  <slot v-if="isLogin" />
  <NotLogin v-else />
</template>
<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import NotLogin from "@/views/error/notLogin.vue";

const userStore = useUserStoreHook();
const { isLogin } = userStore;
</script>
